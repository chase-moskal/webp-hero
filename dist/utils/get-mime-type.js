export async function getMimeType(src) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("HEAD", src, true);
        xhr.onload = () => resolve(xhr.getResponseHeader("Content-Type"));
        xhr.onerror = () => reject(new Error(`error getting image mime type: ${xhr.status} ${xhr.statusText}`));
        xhr.send();
    });
}
//# sourceMappingURL=get-mime-type.js.map