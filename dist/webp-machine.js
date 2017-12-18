import { Webp } from "../libwebp/dist/webp.js";
import { loadBinaryData } from "./load-binary-data.js";
import { detectWebpSupport } from "./detect-webp-support.js";
const relax = () => new Promise(resolve => requestAnimationFrame(resolve));
export class WebpMachineError extends Error {
}
/**
 * Webp Machine
 * - decode and polyfill webp images
 * - can only decode images one-at-a-time (otherwise will throw busy error)
 */
export class WebpMachine {
    constructor({ webp = new Webp(), webpSupport = detectWebpSupport() } = {}) {
        this.busy = false;
        this.cache = {};
        this.webp = webp;
        this.webpSupport = webpSupport;
    }
    /**
     * Decode raw webp data into a png data url
     */
    async decode(webpData) {
        if (this.busy)
            throw new WebpMachineError("cannot decode when already busy");
        this.busy = true;
        try {
            await relax();
            const canvas = document.createElement("canvas");
            this.webp.setCanvas(canvas);
            this.webp.webpToSdl(webpData, webpData.length);
            this.busy = false;
            return canvas.toDataURL();
        }
        catch (error) {
            this.busy = false;
            error.name = WebpMachineError.name;
            error.message = `failed to decode webp image: ${error.message}`;
            throw error;
        }
    }
    /**
     * Polyfill the webp format on the given <img> element
     */
    async polyfillImage(image) {
        if (await this.webpSupport)
            return;
        const { src } = image;
        if (/\.webp$/i.test(src)) {
            if (this.cache[src]) {
                image.src = this.cache[src];
                return;
            }
            try {
                const webpData = await loadBinaryData(src);
                const pngData = await this.decode(webpData);
                image.src = this.cache[src] = pngData;
            }
            catch (error) {
                error.name = WebpMachineError.name;
                error.message = `failed to polyfill image "${src}": ${error.message}`;
                throw error;
            }
        }
    }
    /**
     * Polyfill webp format on the entire web page
     */
    async polyfillDocument({ document = window.document } = {}) {
        if (await this.webpSupport)
            return null;
        for (const image of Array.from(document.querySelectorAll("img"))) {
            try {
                await this.polyfillImage(image);
            }
            catch (error) {
                error.name = WebpMachineError.name;
                error.message = `webp image polyfill failed for url "${image.src}": ${error}`;
                throw error;
            }
        }
    }
}
//# sourceMappingURL=webp-machine.js.map