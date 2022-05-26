
import type * as webpHeroModule from "."

import {loadScript} from "./load-script"
import {detectWebpSupport} from "./detect-webp-support"
import {getScriptSettingsForConditionally} from "./utils/get-script-settings-for-conditionally"

type WebpHeroResult = typeof webpHeroModule | void

declare global {
	interface Window {
		webpHero: typeof webpHeroModule
		webpHeroPromise: Promise<WebpHeroResult>
	}
}

window.webpHeroPromise = Promise.resolve().then(async() => {
	const selector = "script[data-webp-hero]"
	const settings = getScriptSettingsForConditionally({selector})

	const webpSupport = settings.force
		? false
		: await detectWebpSupport()

	if (! webpSupport) {
		await loadScript(settings.bundleUrl)
		const {webpHero} = window

		if (! settings.useCustomBehavior) {
			const webpMachine = new webpHero.WebpMachine({
				webpSupport,
				useCanvasElements: settings.forceUseCanvasElements
					? true
					: undefined,
			})
			await webpMachine.polyfillDocument()
		}

		return webpHero
	}
})
