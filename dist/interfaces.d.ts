import { Webp } from "../libwebp/dist/webp.js";
export declare type DetectWebpImage = (image: HTMLImageElement) => boolean | Promise<boolean>;
export interface WebpMachineOptions {
    webp?: Webp;
    webpSupport?: boolean | Promise<boolean>;
    detectWebpImage?: DetectWebpImage;
    useCanvasElements?: boolean;
}
export interface PolyfillDocumentOptions {
    document?: Document;
}
