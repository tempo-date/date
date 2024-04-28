import { expect, test } from "vitest";
import { parseFormat } from ".";

test("parseFormat should work as expected", () => {
  expect(parseFormat("YYYY/MM/DD", { year: 1403, month: 2, day: 10 })).toBe("1403/02/10");
  expect(parseFormat("YY/MM/DD", { year: 1403, month: 2, day: 10 })).toBe("03/02/10");
  expect(parseFormat("YYYY-MM-DD", { year: 1403, month: 2, day: 10 })).toBe("1403-02-10");
  expect(parseFormat("[YYYY MM DD]", { year: 1403, month: 2, day: 10 })).toBe("[1403 02 10]");
  expect(parseFormat("YYYY M DD", { year: 1403, month: 2, day: 10 })).toBe("1403 M 10");
  expect(parseFormat("YYY MM DD", { year: 1403, month: 2, day: 10 })).toBe("03Y 02 10");
});
