// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.

import type { Data, BaseWrappedPath } from "./types.d.ts";
import type { Storage } from "./storage.ts";
import { join } from "./deps.ts";

const types = join(new URL('.', import.meta.url).href, "/types.d.ts");

export function split(path: string): string[] {
    const keys = path.split(".");

    if (!keys.length) throw new Error(`path cannot be an empty string`);
    if (!keys[keys.length-1].length) throw new Error(`path cannot be ended with .`);

    for (const key of keys)
        for (const char of key)
            if (!"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890".includes(char)) throw new Error(`path cannot contains ${char}`);

    return keys;
};

export async function wrapPath<Structure>(path: string, storage: Storage<Structure>): Promise<BaseWrappedPath> {
    const keys = split(path);
    const script = `import type { WrappedPath, BaseWrappedPath } from "${types}";

export function create(storage: any): BaseWrappedPath {
    type Value = typeof storage.data['${keys.join("']['")}'];
    type ValueObject = typeof storage.data${keys.length === 1 ? '' : `['${keys.slice(0, keys.length-1).join("']['")}']`};

    return {
        /** Sets ${path}'s value */

        set(value: Value): typeof this {
            storage.data['${keys.join("']['")}'] = value;

            return this;
        },

        /** Gets ${path}'s value */

        get(defaultValue?: Value): Value {
            return storage.data['${keys.join("']['")}'];
        },

        /** Deletes ${path} */

        delete(): typeof this {
            delete storage.data['${keys.join("']['")}'];

            return this;
        }
    } as WrappedPath<Value>;
};`;
    const wrappedPath = (await import(`data:application/typescript;charset=utf-8;base64,${btoa(script)}`)).create(storage);

    return wrappedPath;
};
