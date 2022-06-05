
import {attributeFor} from "./attribute-for.js"

export function getConditionallyAttributes(script: HTMLScriptElement) {
	const attribute = attributeFor(script)
	return {
		bundle:
			attribute.string("data-bundle"),

		includePolyfills:
			attribute.string("data-include-polyfills"),

		useCustomBehavior:
			attribute.boolean("data-use-custom-behavior"),

		force:
			attribute.boolean("data-force"),

		forceUseCanvasElements:
			attribute.boolean("data-force-use-canvas-elements"),
	}
}
