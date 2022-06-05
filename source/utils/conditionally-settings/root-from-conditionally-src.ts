
import {WebpHeroConditionallySrcError} from "./conditionally-errors.js"

export function rootFromConditionallySrc(src: string) {
	const [,baseUrl] = src.match(/^(.*)dist-cjs\/conditionally\.js$/) ?? []

	if (!baseUrl)
		throw new WebpHeroConditionallySrcError(src)

	return {
		packageUrl: (path: string) => baseUrl + path,
	}
}
