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
            TZ?: string;
            DIRNAME: string;
        };
        encoding: string;
    };
    constructor(path: string);
    data(...args: unknown[]): void;
    /**
     * This method execute the R script given in R class initiation
     * @param timeout Time in ms before the Rscript process is killed.
     * @returns Output from the R script.
     */
    execute(timeout?: number): Promise<string>;
}
