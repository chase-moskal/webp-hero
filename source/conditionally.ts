
import type * as webpHeroModule from "."

import {detectWebpSupport} from "./detect-webp-support.js"
import {getConditionallySettings} from "./utils/get-conditionally-settings.js"
import {loadBundleAndMaybePolyfills} from "./utils/load-bundle-and-maybe-polyfills.js"

type WebpHeroResult = typeof webpHeroModule | void

declare global {
	interface Window {
		webpHero: typeof webpHeroModule
		webpHeroPromise: Promise<WebpHeroResult>
	}
}

window.webpHeroPromise = Promise.resolve().then(async() => {
	const {attributes, bundleUrl, polyfillsUrl}
		= getConditionallySettings("script[data-webp-hero]")

	const webpSupport = attributes.force
		? false
		: await detectWebpSupport()

	if (! webpSupport) {
		await loadBundleAndMaybePolyfills({bundleUrl, polyfillsUrl})
		const {webpHero} = window

		if (! attributes.useCustomBehavior) {
			const webpMachine = new webpHero.WebpMachine({
				webpSupport,
				useCanvasElements: attributes.forceUseCanvasElements
					? true
					: undefined,
			})
			await webpMachine.polyfillDocument()
		}
		return webpHero
	}
})
