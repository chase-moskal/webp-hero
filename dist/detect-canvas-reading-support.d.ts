/**
 * detect whether or not the browser allows reading from a canvas
 *  - some browsers, as an anti-fingerprinting security measure,
 *    disallow reading data from a canvas.
 *  - if canvas reading isn't allowed, to polyfill images,
 *    we have to display the actual canvases instead of reading out
 *    their data to inject as <img> elements.
 */
export declare function detectCanvasReadingSupport(): boolean;
