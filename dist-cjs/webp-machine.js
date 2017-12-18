"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebpMachine = exports.improvedWebpImageDetector = exports.defaultDetectWebpImage = exports.WebpMachineError = void 0;
var webp_js_1 = require("../libwebp/dist/webp.cjs.js");
var load_binary_data_js_1 = require("./load-binary-data.js");
var get_mime_type_js_1 = require("./utils/get-mime-type.js");
var parse_data_url_js_1 = require("./utils/parse-data-url.js");
var detect_webp_support_js_1 = require("./detect-webp-support.js");
var convert_binary_data_js_1 = require("./convert-binary-data.js");
var detect_canvas_reading_support_js_1 = require("./detect-canvas-reading-support.js");
var relax = function () { return new Promise(function (resolve) { return setTimeout(resolve, 0); }); };
var WebpMachineError = /** @class */ (function (_super) {
    __extends(WebpMachineError, _super);
    function WebpMachineError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return WebpMachineError;
}(Error));
exports.WebpMachineError = WebpMachineError;
/**
 * detect a webp image by its extension
 * @deprecated please use `improvedWebpImageDetector` instead, but note it returns a promise
 */
var defaultDetectWebpImage = function (image) {
    return /\.webp.*$/i.test(image.src);
};
exports.defaultDetectWebpImage = defaultDetectWebpImage;
function improvedWebpImageDetector(image) {
    return __awaiter(this, void 0, void 0, function () {
        var dataUrl, type, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    dataUrl = (0, parse_data_url_js_1.parseDataUrl)(image.src);
                    if (!dataUrl) return [3 /*break*/, 1];
                    _a = dataUrl.format;
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, (0, get_mime_type_js_1.getMimeType)(image.src)];
                case 2:
                    _a = _b.sent();
                    _b.label = 3;
                case 3:
                    type = _a;
                    return [2 /*return*/, type.indexOf("image/webp") !== -1];
            }
        });
    });
}
exports.improvedWebpImageDetector = improvedWebpImageDetector;
/**
 * Webp Machine
 * - decode and polyfill webp images
 * - can only decode images one-at-a-time (otherwise will throw busy error)
 */
var WebpMachine = /** @class */ (function () {
    function WebpMachine(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.webp, webp = _c === void 0 ? new webp_js_1.Webp() : _c, _d = _b.webpSupport, webpSupport = _d === void 0 ? (0, detect_webp_support_js_1.detectWebpSupport)() : _d, _e = _b.useCanvasElements, useCanvasElements = _e === void 0 ? !(0, detect_canvas_reading_support_js_1.detectCanvasReadingSupport)() : _e, _f = _b.detectWebpImage, detectWebpImage = _f === void 0 ? improvedWebpImageDetector : _f;
        this.busy = false;
        this.cache = {};
        this.webp = webp;
        this.webpSupport = webpSupport;
        this.useCanvasElements = useCanvasElements;
        this.detectWebpImage = detectWebpImage;
    }
    /**
     * Replace an <img> element with a <canvas> element
     */
    WebpMachine.replaceImageWithCanvas = function (image, canvas) {
        canvas.className = image.className;
        canvas.style.cssText = window.getComputedStyle(image).cssText;
        canvas.style.pointerEvents = canvas.style.pointerEvents || "none";
        var imageWidth = image.getAttribute("width");
        var imageHeight = image.getAttribute("height");
        canvas.style.width = image.style.width
            || (imageWidth
                ? "".concat(imageWidth, "px")
                : "auto");
        canvas.style.height = image.style.height
            || (imageHeight
                ? "".concat(imageHeight, "px")
                : "auto");
        var parent = image.parentElement;
        parent.replaceChild(canvas, image);
    };
    /**
     * Make a copy of a canvas element (useful for caching)
     */
    WebpMachine.cloneCanvas = function (oldCanvas) {
        var newCanvas = document.createElement("canvas");
        newCanvas.className = oldCanvas.className;
        newCanvas.width = oldCanvas.width;
        newCanvas.height = oldCanvas.height;
        newCanvas.style.cssText = window.getComputedStyle(oldCanvas).cssText;
        var context = newCanvas.getContext("2d");
        context.drawImage(oldCanvas, 0, 0);
        return newCanvas;
    };
    /**
     * Paint a webp image onto a canvas element
     */
    WebpMachine.prototype.decodeToCanvas = function (canvas, webpData) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.busy)
                            throw new WebpMachineError("cannot decode when already busy");
                        this.busy = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, relax()];
                    case 2:
                        _a.sent();
                        this.webp.setCanvas(canvas);
                        this.webp.webpToSdl(webpData, webpData.length);
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _a.sent();
                        error_1.name = WebpMachineError.name;
                        error_1.message = "failed to decode webp image: ".concat(error_1.message);
                        throw error_1;
                    case 4:
                        this.busy = false;
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Decode raw webp data into a png data url
     */
    WebpMachine.prototype.decode = function (webpData) {
        return __awaiter(this, void 0, void 0, function () {
            var canvas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        canvas = document.createElement("canvas");
                        return [4 /*yield*/, this.decodeToCanvas(canvas, webpData)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, canvas.toDataURL()];
                }
            });
        });
    };
    /**
     * Polyfill the webp format on the given <img> element
     */
    WebpMachine.prototype.polyfillImage = function (image) {
        return __awaiter(this, void 0, void 0, function () {
            var src, canvas, webpData, _a, canvas, pngData, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.webpSupport];
                    case 1:
                        if (_b.sent())
                            return [2 /*return*/];
                        src = image.src;
                        return [4 /*yield*/, this.detectWebpImage(image)];
                    case 2:
                        if (!_b.sent()) return [3 /*break*/, 12];
                        if (!this.cache[src]) return [3 /*break*/, 3];
                        if (this.useCanvasElements) {
                            canvas = WebpMachine.cloneCanvas(this.cache[src]);
                            WebpMachine.replaceImageWithCanvas(image, canvas);
                        }
                        else
                            image.src = this.cache[src];
                        return [3 /*break*/, 12];
                    case 3:
                        _b.trys.push([3, 11, , 12]);
                        if (!(0, convert_binary_data_js_1.isBase64Url)(src)) return [3 /*break*/, 4];
                        _a = (0, convert_binary_data_js_1.convertDataURIToBinary)(src);
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, (0, load_binary_data_js_1.loadBinaryData)(src)];
                    case 5:
                        _a = _b.sent();
                        _b.label = 6;
                    case 6:
                        webpData = _a;
                        if (!this.useCanvasElements) return [3 /*break*/, 8];
                        canvas = document.createElement("canvas");
                        return [4 /*yield*/, this.decodeToCanvas(canvas, webpData)];
                    case 7:
                        _b.sent();
                        WebpMachine.replaceImageWithCanvas(image, canvas);
                        this.cache[src] = canvas;
                        return [3 /*break*/, 10];
                    case 8: return [4 /*yield*/, this.decode(webpData)];
                    case 9:
                        pngData = _b.sent();
                        image.src = this.cache[src] = pngData;
                        _b.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        error_2 = _b.sent();
                        error_2.name = WebpMachineError.name;
                        error_2.message = "failed to polyfill image \"".concat(src, "\": ").concat(error_2.message);
                        console.error(error_2);
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Polyfill webp format on the entire web page
     */
    WebpMachine.prototype.polyfillDocument = function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.document, document = _c === void 0 ? window.document : _c;
        return __awaiter(this, void 0, void 0, function () {
            var _i, _d, image;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _i = 0, _d = Array.from(document.querySelectorAll("img"));
                        _e.label = 1;
                    case 1:
                        if (!(_i < _d.length)) return [3 /*break*/, 4];
                        image = _d[_i];
                        return [4 /*yield*/, this.polyfillImage(image)];
                    case 2:
                        _e.sent();
                        _e.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Manually wipe the cache to save memory
     */
    WebpMachine.prototype.clearCache = function () {
        this.cache = {};
    };
    return WebpMachine;
}());
exports.WebpMachine = WebpMachine;
//# sourceMappingURL=webp-machine.js.map