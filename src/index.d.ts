export declare class R {
    path: string;
    arguments: {
        number?: unknown;
    };
    command: string;
    commandArgs: string[];
    options: {
        env: {
            input: string;
            TZ?: string | undefined;
            DIRNAME: string;
        };
        encoding: string;
    };
    constructor(path: string);
    data(...args: unknown[]): void;
    execute(timeout?: number): Promise<string>;
}
