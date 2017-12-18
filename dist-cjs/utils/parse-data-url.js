"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDataUrl = void 0;
function parseDataUrl(dataUrl) {
    var match = dataUrl.match(/^data:(\S+);base64,(\S+)/i);
    if (match) {
        var format = match[0], base64 = match[1];
        return { format: format, base64: base64 };
    }
}
exports.parseDataUrl = parseDataUrl;
//# sourceMappingURL=parse-data-url.js.map