#!/usr/bin/env node
import { R } from "../src";

const attitude = JSON.parse(
  require("fs").readFileSync("example/attitude.json", "utf8")
);

const RInstance = new R("example/ex.R");
RInstance.data({ df: attitude, nGroups: 3, fxn: "mean" });

(async function () {
  try {
    const result = await RInstance.execute();
    console.log(JSON.parse(result));
  } catch (error: any) {
    console.error(error);
  }
})();
