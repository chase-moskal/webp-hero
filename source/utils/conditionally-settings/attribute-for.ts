
export function attributeFor(element: HTMLElement) {
	return {
		string: (key: string) => element.getAttribute(key) ?? undefined,
		boolean: (key: string) => <boolean>element.hasAttribute(key),
	}
}
