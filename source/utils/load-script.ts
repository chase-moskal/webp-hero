
export async function loadScript(src: string): Promise<void> {
	const script = document.createElement("script")
	script.defer = true
	script.src = src
	document.head.appendChild(script)
	return new Promise((resolve, reject) => {
		script.onload = () => resolve()
		script.onerror = error => reject(error)
	})
}
