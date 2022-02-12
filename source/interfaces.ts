
import {Webp} from "../libwebp/dist/webp.js"

export type DetectWebpImage = (image: HTMLImageElement) => boolean

export interface WebpMachineOptions {
	webp?: Webp
	webpSupport?: Promise<boolean>
	detectWebpImage?: DetectWebpImage
	useCanvasElements?: boolean
}

export interface PolyfillDocumentOptions {
	document?: Document
}
