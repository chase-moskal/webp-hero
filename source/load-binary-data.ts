
export async function loadBinaryData(url: string): Promise<Uint8Array> {
	return new Promise<Uint8Array>(function(resolve, reject) {

		const xhr = new XMLHttpRequest()
		xhr.open("GET", url)
		xhr.responseType = "arraybuffer"
	
		xhr.onerror = reject

		xhr.onreadystatechange = () => {
			if (xhr.readyState == 4 && xhr.status == 200) {
				resolve(new Uint8Array(xhr.response))
			}
		}

		xhr.send()
	})
}
