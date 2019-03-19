
import {Webp} from "../libwebp/dist/webp.js"

export interface WebpMachineOptions {
	webp?: Webp
	webpSupport?: Promise<boolean>
}

export interface PolyfillDocumentOptions {
	document?: Document
}
