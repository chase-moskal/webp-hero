
export class WebpHeroConditionallyError extends Error {
	name = this.constructor.name
}

export class WebpHeroConditionallySelectorError extends WebpHeroConditionallyError {
	constructor(selector: string) {
		super(`could not find the webp-hero 'conditionally' script with selector "${selector}" (you may have forgotten the "data-webp-hero" attribute on the script element)`)
	}
}

export class WebpHeroConditionallySrcError extends WebpHeroConditionallyError {
	constructor(src: string) {
		super(`script src attribute not recognized "${src}": webp-hero 'conditionally' script needs to read its own src attribute, so it can ascertain the webp-hero package root url (conditionally cannot be bundled and must be specified as a script element in the html document)`)
	}
}
