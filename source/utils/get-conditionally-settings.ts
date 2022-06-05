
import {rootFromConditionallySrc} from "./conditionally-settings/root-from-conditionally-src.js"
import {getConditionallyAttributes} from "./conditionally-settings/get-conditionally-attributes.js"
import {WebpHeroConditionallySelectorError} from "./conditionally-settings/conditionally-errors.js"

export function getConditionallySettings(selector: string) {
	const script = document.querySelector<HTMLScriptElement>(selector)

	if (!script)
		throw new WebpHeroConditionallySelectorError(selector)

	const {packageUrl} = rootFromConditionallySrc(script.src)
	const attributes = getConditionallyAttributes(script)

	const bundleUrl = attributes.bundle
		?? packageUrl("dist-cjs/webp-hero.bundle.js")

	const polyfillsUrl = attributes.includePolyfills === undefined
		? undefined
		: attributes.includePolyfills === ""
			? packageUrl("dist-cjs/polyfills.js")
			: attributes.includePolyfills

	return {
		attributes,
		bundleUrl,
		polyfillsUrl,
	}
}
