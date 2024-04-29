import { expect, test } from "vitest";
import { formatDate } from ".";

test("formatDate should work as expected", () => {
  expect(formatDate({ year: 1403, month: 2, day: 10 }, "YYYY/MM/DD")).toBe("1403/02/10");
  expect(formatDate({ year: 1403, month: 2, day: 10 }, "YY/MM/DD")).toBe("03/02/10");
  expect(formatDate({ year: 1403, month: 2, day: 10 }, "YYYY-MM-DD")).toBe("1403-02-10");
  expect(formatDate({ year: 1403, month: 2, day: 10 }, "YYYY M DD")).toBe("1403 M 10");
  expect(formatDate({ year: 1403, month: 2, day: 10 }, "YYY MM DD")).toBe("03Y 02 10");
});
