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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.getXataClient = exports.XataClient = void 0;
// Generated by Xata Codegen 0.21.0. Please do not edit.
var client_1 = require("@xata.io/client");
var tables = [
    { name: "connections", columns: [{ name: "token", type: "string" }] },
];
var DatabaseClient = (0, client_1.buildClient)();
var defaultOptions = {
    databaseURL: "https://Marco-Bettiolo-s-workspace-q8h5ud.eu-west-1.xata.sh/db/blissgrowth-exercise"
};
var XataClient = /** @class */ (function (_super) {
    __extends(XataClient, _super);
    function XataClient(options) {
        return _super.call(this, __assign(__assign({}, defaultOptions), options), tables) || this;
    }
    return XataClient;
}(DatabaseClient));
exports.XataClient = XataClient;
var instance = undefined;
var getXataClient = function () {
    if (instance)
        return instance;
    instance = new XataClient();
    return instance;
};
exports.getXataClient = getXataClient;