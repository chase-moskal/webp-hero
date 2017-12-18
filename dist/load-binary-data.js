export class LoadingError extends Error {
}
export async function loadBinaryData(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.responseType = "arraybuffer";
        const handleError = () => {
            reject(new LoadingError(`failed to load binary data, code "${xhr.status}" from "${url}"`));
        };
        xhr.onerror = handleError;
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    resolve(new Uint8Array(xhr.response));
                }
                else {
                    handleError();
                }
            }
        };
        xhr.send();
    });
}
//# sourceMappingURL=load-binary-data.js.map