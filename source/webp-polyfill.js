
var canvas = document.querySelector("canvas")
var paragraph = document.querySelector("p")

function decode(webpdata) {
	dwebp.setCanvas(canvas)
	canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

	var start = new Date()
	var result = dwebp.webpToSdl(webpdata, webpdata.length)
	var end = new Date()
	var time = end - start

	paragraph.textContent = `decode time: ${time} ms`
}

function loadfile(filename) {
	var xhr = new XMLHttpRequest()
	xhr.open("GET", filename)
	xhr.responseType = "arraybuffer"
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var webpdata = new Uint8Array(xhr.response)
			decode(webpdata)
		}
	}
	xhr.send()
}

loadfile("./source/dice.webp")
