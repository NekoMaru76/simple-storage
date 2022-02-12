# SimpleStorage
Is a module to create simple storages with structures in memory. It uses TypeScript to check types at compile-time.

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

# How it Works?
Basically `Storage.wrap` imports a file with data URL. The data URL contains a script in base64 form. The script example for the `hello` (from example):
```ts
import type { WrappedPath, BaseWrappedPath } from "./types.d.ts";

export function create(storage: any): BaseWrappedPath {
    type Value = typeof storage.data.hello;
    type ValueObject = typeof storage.data;

    return {
        /** Sets hello's value */

        set(value: Value): typeof this {
            storage.data.hello = value;

            return this;
        },

        /** Gets hello's value */

        get(defaultValue?: Value): Value {
            return storage.data.hello;
        },

        /** Deletes hello */

        delete(): typeof this {
            delete storage.data.hello;

            return this;
        },

        /** Target path */

        path: "hello"
    } as WrappedPath<Value>;
};
```.
Then it will run the `create` function and returns it. The reason it is slow (2s to compile this) is because every path you want to wrap, it will imports a new script.

GitHub: [NekoMaru76](https://github.com/NekoMaru76/)<br />
PayPal: [nekomaru76](https://paypal.me/nekomaru76)
