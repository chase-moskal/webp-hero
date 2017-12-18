/**
 * detect whether or not the browser allows reading from a canvas
 *  - some browsers, as an anti-fingerprinting security measure,
 *    disallow reading data from a canvas.
 *  - if canvas reading isn't allowed, to polyfill images,
 *    we have to display the actual canvases instead of reading out
 *    their data to inject as <img> elements.
 */
export function detectCanvasReadingSupport() {
    const expectedPixel = [17, 34, 51, 255];
    const canvas = document.createElement("canvas");
    canvas.setAttribute("data-canvas-1", "");
    canvas.width = 1;
    canvas.height = 1;
    const context = canvas.getContext("2d");
    context.fillStyle = "#123";
    context.fillRect(0, 0, 1, 1);
    const { data: pixel } = context.getImageData(0, 0, 1, 1);
    let matches = true;
    for (let index = 0; index < pixel.byteLength; index += 1) {
        const byte = pixel[index];
        if (byte !== expectedPixel[index])
            matches = false;
    }
    return matches;
}
//# sourceMappingURL=detect-canvas-reading-support.js.map