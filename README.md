# SimpleStorage
Is a module to create a simple storage with structures. It uses TypeScript to check types at compile-time.

# Example
```ts
import { Storage, WrappedPath } from "https://deno.land/x/simple_storage/mod.ts";

const storage = new Storage<{
    hello?: {
        world?: "Hi!"
    }
}>({});
const hello: WrappedPath<{
    world?: "Hi!"
}> = await storage.wrap("hello");

hello.set({});

const world: WrappedPath<"Hi!"> = await storage.wrap("hello.world");

world.set("Hi!");
console.log(hello.get(), world.get()); //{ world: "Hi!" } "Hi!"
hello.delete();
console.log(hello.get()); //undefined
```
(Note: The `WrappedPath` type is unnecessary. `WrappedPath` type is just to make sure readers know what's `Storage.wrap`'s returns value.)

GitHub: [NekoMaru76](https://github.com/NekoMaru76/)<br />
PayPal: [nekomaru76](https://paypal.me/nekomaru76)
