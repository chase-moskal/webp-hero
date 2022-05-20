import {detectWebpSupport} from "./detect-webp-support";
import {loadScript} from "./load-script";

declare const webpHero;

const _webpPolyfillUrl = window["webpPolyfillUrl"] || 'https://unpkg.com/webp-hero@0.0.2/dist-cjs/polyfills.js';
const _webpBundleUrl = window["webpBundleUrl"] || 'https://unpkg.com/webp-hero@0.0.2/dist-cjs/webp-hero.bundle.js';

/**
 * This code executes immediately, detects WebP support and loads the
 * webp-hero polyfill and bundle and as needed.
 *
 * Loads webp-hero from the unpkg CDN by default, specify alternate source URLs
 * by setting window["webpPolyfillUrl"] and window["webpBundleUrl"] before loading.
 */
(async function() {
	const webpSupported = await detectWebpSupport();
	if (! webpSupported) {
		await loadScript(_webpPolyfillUrl);
		await loadScript(_webpBundleUrl);
		var webpMachine = new webpHero.WebpMachine();
		webpMachine.polyfillDocument();
	}
})();
