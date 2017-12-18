"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var webp_js_1 = require("../libwebp/dist/webp.cjs.js");
var load_binary_data_js_1 = require("./load-binary-data.js");
var detect_webp_support_js_1 = require("./detect-webp-support.js");
var relax = function () { return new Promise(function (resolve) { return requestAnimationFrame(resolve); }); };
var WebpMachineError = /** @class */ (function (_super) {
    __extends(WebpMachineError, _super);
    function WebpMachineError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return WebpMachineError;
}(Error));
exports.WebpMachineError = WebpMachineError;
/**
 * Webp Machine
 * - decode and polyfill webp images
 * - can only decode images one-at-a-time (otherwise will throw busy error)
 */
var WebpMachine = /** @class */ (function () {
    function WebpMachine(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.webp, webp = _c === void 0 ? new webp_js_1.Webp() : _c, _d = _b.webpSupport, webpSupport = _d === void 0 ? detect_webp_support_js_1.detectWebpSupport() : _d;
        this.busy = false;
        this.cache = {};
        this.webp = webp;
        this.webpSupport = webpSupport;
    }
    /**
     * Decode raw webp data into a png data url
     */
    WebpMachine.prototype.decode = function (webpData) {
        return __awaiter(this, void 0, void 0, function () {
            var canvas, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.busy)
                            throw new WebpMachineError("cannot decode when already busy");
                        this.busy = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, relax()];
                    case 2:
                        _a.sent();
                        canvas = document.createElement("canvas");
                        this.webp.setCanvas(canvas);
                        this.webp.webpToSdl(webpData, webpData.length);
                        this.busy = false;
                        return [2 /*return*/, canvas.toDataURL()];
                    case 3:
                        error_1 = _a.sent();
                        this.busy = false;
                        error_1.name = WebpMachineError.name;
                        error_1.message = "failed to decode webp image: " + error_1.message;
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Polyfill the webp format on the given <img> element
     */
    WebpMachine.prototype.polyfillImage = function (image) {
        return __awaiter(this, void 0, void 0, function () {
            var src, webpData, pngData, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.webpSupport];
                    case 1:
                        if (_a.sent())
                            return [2 /*return*/];
                        src = image.src;
                        if (!/\.webp$/i.test(src)) return [3 /*break*/, 6];
                        if (this.cache[src]) {
                            image.src = this.cache[src];
                            return [2 /*return*/];
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, load_binary_data_js_1.loadBinaryData(src)];
                    case 3:
                        webpData = _a.sent();
                        return [4 /*yield*/, this.decode(webpData)];
                    case 4:
                        pngData = _a.sent();
                        image.src = this.cache[src] = pngData;
                        return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        error_2.name = WebpMachineError.name;
                        error_2.message = "failed to polyfill image \"" + src + "\": " + error_2.message;
                        throw error_2;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Polyfill webp format on the entire web page
     */
    WebpMachine.prototype.polyfillDocument = function (_a) {
        var _b = (_a === void 0 ? {} : _a).document, document = _b === void 0 ? window.document : _b;
        return __awaiter(this, void 0, void 0, function () {
            var _i, _c, image, error_3;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.webpSupport];
                    case 1:
                        if (_d.sent())
                            return [2 /*return*/, null];
                        _i = 0, _c = Array.from(document.querySelectorAll("img"));
                        _d.label = 2;
                    case 2:
                        if (!(_i < _c.length)) return [3 /*break*/, 7];
                        image = _c[_i];
                        _d.label = 3;
                    case 3:
                        _d.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.polyfillImage(image)];
                    case 4:
                        _d.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_3 = _d.sent();
                        error_3.name = WebpMachineError.name;
                        error_3.message = "webp image polyfill failed for url \"" + image.src + "\": " + error_3;
                        throw error_3;
                    case 6:
                        _i++;
                        return [3 /*break*/, 2];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return WebpMachine;
}());
exports.WebpMachine = WebpMachine;
//# sourceMappingURL=webp-machine.js.map