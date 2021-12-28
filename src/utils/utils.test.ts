import { option } from "fp-ts";
import { Utils } from "./utils";

describe("or", () => {
  it("should find the first some", () => {
    expect(Utils.or(option.some("A"), option.some("B"), option.some("C"))).toEqual(option.some("A"));
    expect(Utils.or(option.none, option.some("B"), option.none)).toEqual(option.some("B"));
    expect(Utils.or(option.none, option.none, option.some("C"))).toEqual(option.some("C"));
  });

  it("should be none if all nones", () => {
    expect(Utils.or(option.none, option.none, option.none)).toEqual(option.none);
  });
});
