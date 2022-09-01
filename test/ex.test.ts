import { R } from "../src";

const attitude = JSON.parse(
  require("fs").readFileSync("example/attitude.json", "utf8")
);

describe("R script runner", () => {
  it("should run R script without timeout", async () => {
    const RInstance = new R("example/ex.R");
    RInstance.data({ df: attitude, nGroups: 3, fxn: "mean" });
    const result = await RInstance.execute();
    expect(JSON.parse(result)).toMatchObject([
      { group: "(40,55]", rating: 46.7143, advance: 41.1429 },
      { group: "(55,70]", rating: 64.6154, advance: 41.9231 },
      { group: "(70,85]", rating: 77.2, advance: 45.5 },
    ]);
  });

  it("should not timeout before R script completion", async () => {
    const RInstance = new R("example/ex.R");
    RInstance.data({ df: attitude, nGroups: 3, fxn: "mean" });
    const result = await RInstance.execute(4500);

    expect(JSON.parse(result)).toMatchObject([
      { group: "(40,55]", rating: 46.7143, advance: 41.1429 },
      { group: "(55,70]", rating: 64.6154, advance: 41.9231 },
      { group: "(70,85]", rating: 77.2, advance: 45.5 },
    ]);
  });

  it("should timeout before R script completion", async () => {
    const RInstance = new R("example/ex.R");
    RInstance.data({ df: attitude, nGroups: 3, fxn: "mean" });

    await expect(RInstance.execute(1)).rejects.toThrow(
      "Rscript process timeout"
    );
  });
});
