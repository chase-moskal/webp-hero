import { Webp } from "../libwebp/dist/webp.js";
import { loadBinaryData } from "./load-binary-data.js";
import { getMimeType } from "./utils/get-mime-type.js";
import { parseDataUrl } from "./utils/parse-data-url.js";
import { detectWebpSupport } from "./detect-webp-support.js";
import { convertDataURIToBinary, isBase64Url } from "./convert-binary-data.js";
import { detectCanvasReadingSupport } from "./detect-canvas-reading-support.js";
const relax = () => new Promise(resolve => setTimeout(resolve, 0));
export class WebpMachineError extends Error {
}
/**
 * detect a webp image by its extension
 * @deprecated please use `improvedWebpImageDetector` instead, but note it returns a promise
 */
export const defaultDetectWebpImage = (image) => /\.webp.*$/i.test(image.src);
export async function improvedWebpImageDetector(image) {
    const dataUrl = parseDataUrl(image.src);
    const type = dataUrl
        ? dataUrl.format
        : await getMimeType(image.src);
    return type.indexOf("image/webp") !== -1;
}
/**
 * Webp Machine
 * - decode and polyfill webp images
 * - can only decode images one-at-a-time (otherwise will throw busy error)
 */
export class WebpMachine {
    webp;
    webpSupport;
    detectWebpImage;
    busy = false;
    cache = {};
    useCanvasElements;
    constructor({ webp = new Webp(), webpSupport = detectWebpSupport(), useCanvasElements = !detectCanvasReadingSupport(), detectWebpImage = improvedWebpImageDetector, } = {}) {
        this.webp = webp;
        this.webpSupport = webpSupport;
        this.useCanvasElements = useCanvasElements;
        this.detectWebpImage = detectWebpImage;
    }
    /**
     * Replace an <img> element with a <canvas> element
     */
    static replaceImageWithCanvas(image, canvas) {
        canvas.className = image.className;
        canvas.style.cssText = window.getComputedStyle(image).cssText;
        canvas.style.pointerEvents = canvas.style.pointerEvents || "none";
        const imageWidth = image.getAttribute("width");
        const imageHeight = image.getAttribute("height");
        canvas.style.width = image.style.width
            || (imageWidth
                ? `${imageWidth}px`
                : "auto");
        canvas.style.height = image.style.height
            || (imageHeight
                ? `${imageHeight}px`
                : "auto");
        const parent = image.parentElement;
        parent.replaceChild(canvas, image);
    }
    /**
     * Make a copy of a canvas element (useful for caching)
     */
    static cloneCanvas(oldCanvas) {
        const newCanvas = document.createElement("canvas");
        newCanvas.className = oldCanvas.className;
        newCanvas.width = oldCanvas.width;
        newCanvas.height = oldCanvas.height;
        newCanvas.style.cssText = window.getComputedStyle(oldCanvas).cssText;
        const context = newCanvas.getContext("2d");
        context.drawImage(oldCanvas, 0, 0);
        return newCanvas;
    }
    /**
     * Paint a webp image onto a canvas element
     */
    async decodeToCanvas(canvas, webpData) {
        if (this.busy)
            throw new WebpMachineError("cannot decode when already busy");
        this.busy = true;
        try {
            await relax();
            this.webp.setCanvas(canvas);
            this.webp.webpToSdl(webpData, webpData.length);
        }
        catch (error) {
            error.name = WebpMachineError.name;
            error.message = `failed to decode webp image: ${error.message}`;
            throw error;
        }
        finally {
            this.busy = false;
        }
    }
    /**
     * Decode raw webp data into a png data url
     */
    async decode(webpData) {
        const canvas = document.createElement("canvas");
        await this.decodeToCanvas(canvas, webpData);
        return canvas.toDataURL();
    }
    /**
     * Polyfill the webp format on the given <img> element
     */
    async polyfillImage(image) {
        if (await this.webpSupport)
            return;
        const { src } = image;
        if (await this.detectWebpImage(image)) {
            if (this.cache[src]) {
                if (this.useCanvasElements) {
                    const canvas = WebpMachine.cloneCanvas(this.cache[src]);
                    WebpMachine.replaceImageWithCanvas(image, canvas);
                }
                else
                    image.src = this.cache[src];
            }
            else {
                try {
                    const webpData = isBase64Url(src)
                        ? convertDataURIToBinary(src)
                        : await loadBinaryData(src);
                    if (this.useCanvasElements) {
                        const canvas = document.createElement("canvas");
                        await this.decodeToCanvas(canvas, webpData);
                        WebpMachine.replaceImageWithCanvas(image, canvas);
                        this.cache[src] = canvas;
                    }
                    else {
                        const pngData = await this.decode(webpData);
                        image.src = this.cache[src] = pngData;
                    }
                }
                catch (error) {
                    error.name = WebpMachineError.name;
                    error.message = `failed to polyfill image "${src}": ${error.message}`;
                    console.error(error);
                }
            }
        }
    }
    /**
     * Polyfill webp format on the entire web page
     */
    async polyfillDocument({ document = window.document } = {}) {
        for (const image of Array.from(document.querySelectorAll("img")))
            await this.polyfillImage(image);
    }
    /**
     * Manually wipe the cache to save memory
     */
    clearCache() {
        this.cache = {};
    }
}
//# sourceMappingURL=webp-machine.js.map