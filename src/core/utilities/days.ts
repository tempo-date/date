import { DAYS_COUNT, MAX_CACHE_SIZE } from "../constants/internals";
import { DateObject } from "@/types";
import { getCurrentMonthDays, decadeIndex, getNextMonthDays, getPreviousMonthDays, isWeekend, join } from ".";
import cache from "../cache";

export function computeDays(year: number, month: number): Array<DateObject> {
  const key = join(year, month);

  if (cache.has(key)) return cache.get(key)!;

  const days = new Array<DateObject>();

  const previousDays = getPreviousMonthDays(year, month);

  const currentDays = getCurrentMonthDays(year, month);

  days.push(...previousDays, ...currentDays);

  const nextDays = getNextMonthDays(year, month, DAYS_COUNT - days.length);

  days.push(...nextDays);

  function current(date: DateObject) {
    return date.year === year && date.month === month;
  }

  const markedDays = days.map((date) => {
    date["_current"] = current(date);
    date["_decadeIndex"] = decadeIndex(date.year);
    date["_weekend"] = isWeekend(date);

    return date;
  });

  cache.set(key, markedDays);

  if (cache.size > MAX_CACHE_SIZE) {
    cache.delete(cache.keys().next().value);
  }
  return markedDays;
}
