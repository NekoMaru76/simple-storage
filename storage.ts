import type { BaseWrappedPath } from "./types.d.ts";
import { wrapPath } from "./utils.ts";

export class Storage<Structure> {
    /** Cached wrapped paths */
    cache: Map<string, BaseWrappedPath> = new Map;

    constructor(public data: Structure) {}

    /** Wraps path */
    async wrap(path: string): ReturnType<typeof wrapPath> {
        const { cache } = this;
        const wrappedPath = (cache.has(path) ? cache.get(path) : cache.set(path, await wrapPath(path, this)).get(path)) as BaseWrappedPath;

        return wrappedPath;
    }
};
