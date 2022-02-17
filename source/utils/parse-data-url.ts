
export function parseDataUrl(dataUrl: string) {
	const match = dataUrl.match(/^data:(\S+);base64,(\S+)/i)
	if (match) {
		const [format, base64] = match
		return {format, base64}
	}
}
