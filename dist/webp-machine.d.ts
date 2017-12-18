import { WebpMachineOptions, PolyfillDocumentOptions, DetectWebpImage } from "./interfaces.js";
export declare class WebpMachineError extends Error {
}
/**
 * detect a webp image by its extension
 * @deprecated please use `improvedWebpImageDetector` instead, but note it returns a promise
 */
export declare const defaultDetectWebpImage: DetectWebpImage;
export declare function improvedWebpImageDetector(image: HTMLImageElement): Promise<boolean>;
/**
 * Webp Machine
 * - decode and polyfill webp images
 * - can only decode images one-at-a-time (otherwise will throw busy error)
 */
export declare class WebpMachine {
    private readonly webp;
    private readonly webpSupport;
    private readonly detectWebpImage;
    private busy;
    private cache;
    private useCanvasElements;
    constructor({ webp, webpSupport, useCanvasElements, detectWebpImage, }?: WebpMachineOptions);
    /**
     * Replace an <img> element with a <canvas> element
     */
    static replaceImageWithCanvas(image: HTMLImageElement, canvas: HTMLCanvasElement): void;
    /**
     * Make a copy of a canvas element (useful for caching)
     */
    static cloneCanvas(oldCanvas: HTMLCanvasElement): HTMLCanvasElement;
    /**
     * Paint a webp image onto a canvas element
     */
    decodeToCanvas(canvas: HTMLCanvasElement, webpData: Uint8Array): Promise<void>;
    /**
     * Decode raw webp data into a png data url
     */
    decode(webpData: Uint8Array): Promise<string>;
    /**
     * Polyfill the webp format on the given <img> element
     */
    polyfillImage(image: HTMLImageElement): Promise<void>;
    /**
     * Polyfill webp format on the entire web page
     */
    polyfillDocument({ document }?: PolyfillDocumentOptions): Promise<void>;
    /**
     * Manually wipe the cache to save memory
     */
    clearCache(): void;
}
