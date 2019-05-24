import * as koa from "koa";
import * as assert from "assert";
import * as mocha from "mocha";
import caseof from "./caseof"

describe("koa-caseof", () => {
  
  it("should match the correct routes for objects", async() => {

    type CT = koa.Context & {
      user: { role: string }
    }

    const middleware = caseof<CT>("user.role", {
      "admin": () => "admin called",
      "normal": () => "normal called",
    });

    const next = async() => "default called"
    
    const adminMatched = await middleware({
      user: { role: "admin" }
    } as any, next)

    assert.equal(adminMatched, "admin called")

    const normalMatched = await middleware({
      user: { role: "normal" }
    } as any, next)

    assert.equal(normalMatched, "normal called")

    const defaultMatched = await middleware({
      user: { role: "nonexistantrole" }
    } as any, next)

    assert.equal(defaultMatched, "default called")

  })

  it("should match the correct routes for arrays", async() => {

    type CT = koa.Context & {
      array: Array<Array<string>>
    }

    const middleware = caseof<CT>("array[0][0]", {
      "foo": () => "foo called"
    });

    const next = async() => "default called"
    
    const fooMatched = await middleware({
      array: [["foo"]]
    } as any, next)

    assert.equal(fooMatched, "foo called")

    const defaultMatched = await middleware({
      array: [1, ["foo"]]
    } as any, next)

    assert.equal(defaultMatched, "default called")

  })

});