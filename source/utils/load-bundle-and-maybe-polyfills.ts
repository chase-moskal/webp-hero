
import {loadScript} from "./load-script.js"

export async function loadBundleAndMaybePolyfills({bundleUrl, polyfillsUrl}: {
		bundleUrl: string
		polyfillsUrl: undefined | string
	}) {

	await Promise.all([
		polyfillsUrl
			? loadScript(polyfillsUrl)
			: Promise.resolve(),
		loadScript(bundleUrl),
	])
}
