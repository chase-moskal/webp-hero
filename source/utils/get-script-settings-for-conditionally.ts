
export function getScriptSettingsForConditionally({selector}: {
		selector: string
	}) {

	const script = document.querySelector<HTMLScriptElement>(selector)

	if (!script)
		throw new Error(`webp-hero loading error: "${selector}" not found. webp-hero's conditional loader is unable to find its own script element, which is required to find the necessary settings.`)

	const attrs = attributesFor(script)

	return {
		bundleUrl:
			attrs.string("data-bundle")
			?? contriveBundleUrlFromConditionallySrc(script.src),

		useCustomBehavior:
			attrs.boolean("data-use-custom-behavior"),

		force:
			attrs.boolean("data-force"),

		forceUseCanvasElements:
			attrs.boolean("data-force-use-canvas-elements"),
	}
}

//
// internal utility functions
//

function attributesFor(element: HTMLElement) {
	return {
		string: (key: string) => element.getAttribute(key) ?? undefined,
		boolean: (key: string) => <boolean>element.hasAttribute(key),
	}
}

function contriveBundleUrlFromConditionallySrc(src: string) {
	const [,baseUrl] = src.match(/^(.*)\/conditionally\.js$/) ?? []

	if (!baseUrl)
		throw new Error(`webp-hero loading error: unable to contrive webp-hero bundle url based on this invalid conditionally bundle src: "${src}" (you may need to provide the "data-bundle" url attribute to webp-hero's conditional loader script element)`)

	return `${baseUrl}/webp-hero.bundle.js`
}
