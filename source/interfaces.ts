
import {Webp} from "../libwebp/dist/webp"

export interface WebpHeroOptions {
	webp?: Webp
	webpSupport?: Promise<boolean>
}
