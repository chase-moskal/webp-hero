
declare module "dwebp" {
	class Dwebp {
		Module: any
		webpToSdl(webpdata: Uint8Array): number
		setCanvas(canvas: HTMLCanvasElement): void
	}
	export = Dwebp
}
