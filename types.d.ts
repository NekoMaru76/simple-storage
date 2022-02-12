// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.

export interface Data {
    [key: string]: any;
}

export interface BaseWrappedPath {
    set(value: any): void;
    get(): any;
    delete(): void;
}

export interface WrappedPath<Value> extends BaseWrappedPath {
    set(value: Value): void;
    get(): Value;
    delete(): void;
}
