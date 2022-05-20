export async function loadScript(url: string):Promise<Event> {
	var js = document.createElement('script');
	js.src = url;
	document.body.appendChild(js)
	return new Promise(resolve => {
		js.addEventListener('load', function(result) {
			resolve(result);
		} );
	})
}
