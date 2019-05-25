"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = __importStar(require("assert"));
const caseof_1 = __importDefault(require("./caseof"));
describe("koa-caseof", () => {
    it("should match the correct routes for objects", async () => {
        const middleware = caseof_1.default("user.role", {
            "admin": () => "admin called",
            "normal": () => "normal called",
        });
        const next = async () => "default called";
        const adminMatched = await middleware({
            user: { role: "admin" }
        }, next);
        assert.equal(adminMatched, "admin called");
        const normalMatched = await middleware({
            user: { role: "normal" }
        }, next);
        assert.equal(normalMatched, "normal called");
        const defaultMatched = await middleware({
            user: { role: "nonexistantrole" }
        }, next);
        assert.equal(defaultMatched, "default called");
    });
    it("should match the correct routes for arrays", async () => {
        const middleware = caseof_1.default("array[0][0]", {
            "foo": () => "foo called"
        });
        const next = async () => "default called";
        const fooMatched = await middleware({
            array: [["foo"]]
        }, next);
        assert.equal(fooMatched, "foo called");
        const defaultMatched = await middleware({
            array: [1, ["foo"]]
        }, next);
        assert.equal(defaultMatched, "default called");
    });
});
