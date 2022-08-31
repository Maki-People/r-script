import * as child_process from "child_process";

export class R {
  path: string;
  arguments = {};
  command = "Rscript";
  commandArgs = ["--vanilla", __dirname + "/R/launch.R"];
  options = {
    env: { DIRNAME: __dirname, ...process.env },
    encoding: "utf8",
  };

  constructor(path: string) {
    this.path = path;
  }

  data(...args: unknown[]) {
    for (let i = 0; i < args.length; i++) {
      this.arguments[i] = args[i];
    }
  }

  /**
   * This method execute the R script given in R class initiation
   * @param timeout Time in ms before the Rscript process is killed.
   * @returns Output from the R script.
   */
  async execute(timeout?: number): Promise<string> {
    this.options.env["input"] = JSON.stringify([this.arguments, this.path, {}]);

    const spawnPromise = (cmd: string, args: string[]) => {
      return new Promise((resolve, reject) => {
        try {
          const childProcess = child_process.spawn(cmd, args, this.options);

          let timeoutReference: NodeJS.Timeout;
          if (timeout) {
            timeoutReference = setTimeout(() => {
              childProcess.kill();
              try {
                throw new Error("Rscript process timeout");
              } catch (error: any) {
                reject(error);
              }
            }, timeout);
          }

          let body = "";

          childProcess.stdout.on("data", (data) => {
            body += data.toString();
          });

          childProcess.stdout.once("close", () => {
            if (timeout) clearTimeout(timeoutReference);
            resolve(body);
          });

          childProcess.stderr.on("data", (data) => {
            throw new Error(data.toString());
          });
        } catch (error: any) {
          reject(error);
        }
      });
    };

    return spawnPromise(this.command, this.commandArgs) as Promise<string>;
  }
}
