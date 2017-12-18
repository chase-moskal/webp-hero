"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectCanvasReadingSupport = void 0;
/**
 * detect whether or not the browser allows reading from a canvas
 *  - some browsers, as an anti-fingerprinting security measure,
 *    disallow reading data from a canvas.
 *  - if canvas reading isn't allowed, to polyfill images,
 *    we have to display the actual canvases instead of reading out
 *    their data to inject as <img> elements.
 */
function detectCanvasReadingSupport() {
    var expectedPixel = [17, 34, 51, 255];
    var canvas = document.createElement("canvas");
    canvas.setAttribute("data-canvas-1", "");
    canvas.width = 1;
    canvas.height = 1;
    var context = canvas.getContext("2d");
    context.fillStyle = "#123";
    context.fillRect(0, 0, 1, 1);
    var pixel = context.getImageData(0, 0, 1, 1).data;
    var matches = true;
    for (var index = 0; index < pixel.byteLength; index += 1) {
        var byte = pixel[index];
        if (byte !== expectedPixel[index])
            matches = false;
    }
    return matches;
}
exports.detectCanvasReadingSupport = detectCanvasReadingSupport;
//# sourceMappingURL=detect-canvas-reading-support.js.map