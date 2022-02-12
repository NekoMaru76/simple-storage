import { assertEquals } from "https://deno.land/std@0.125.0/testing/asserts.ts";
import { Storage } from "./mod.ts";
import type { Data } from "./types.d.ts";

const helloWorld = new Storage<{
    hello?: {
        world?: "Hi!"
    }
}>({});
const math = new Storage<{
    num1: number,
    num2: number,
    num3?: number
}>({
    num1: 1,
    num2: 2
});

Deno.test("Hello World", async () => {
    const hello = await helloWorld.wrap("hello");

    hello.set({});
    assertEquals(hello.get(), {});

    const world = await helloWorld.wrap("hello.world");

    world.set("Hi!");
    assertEquals(world.get(), "Hi!");
    hello.delete();
    assertEquals(hello.get(), undefined);
});
Deno.test("Math", async () => {
    const num1 = await math.wrap("num1");
    const num2 = await math.wrap("num2");
    const num3 = await math.wrap("num3");

    assertEquals(num1.get(), 1);
    assertEquals(num2.get(), 2);
    num3.set(num1.get()+num2.get());
    assertEquals(num3.get(), 3);
});
