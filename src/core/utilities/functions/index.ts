import moment from "moment-jalaali";
import { DateObject, DisabledDates, MonthObject, Tuple, YearObject } from "@/types";
import { DateInstance } from "@/utils";
import { DAYS_COUNT, DECADE, MAX_CACHE_SIZE, WEEKEND_INDEX } from "@/core/constants/internals";
import { MONTHS } from "@/core/constants/datasets";
import * as helpers from "../helpers";
import cache from "@/core/cache";

export function getDecadeStart(year: number) {
  return Math.floor(year / DECADE) * DECADE;
}

export function getDecadeBounds(start: number): Array<number> {
  return [start, start + DECADE - 1];
}

export function getYearsObject(start: number): Array<YearObject> {
  const years = Array.from({ length: DECADE }, (_, counter) => ({ year: start + counter, _current: true }));

  const prefix = { year: start - 1, _current: false };

  const suffix = { year: start + DECADE, _current: false };

  return [prefix, ...years, suffix];
}

export function getMonthsObject(year: number): Array<MonthObject> {
  return MONTHS.map((name, index) => ({ name, year, month: index + 1 }));
}

export function getMonthLength(year: number, month: number) {
  // NOTE: substract month by 1 because moment counting month from 0
  return moment.jDaysInMonth(year, month - 1);
}

export function getMonthName(year: number, month: number | undefined) {
  const monthObject = getMonthsObject(year).find((obj) => obj.month === month);

  if (monthObject) return monthObject.name;
}

export function weekday(year: number, month: number, day = 1) {
  return moment(helpers.joinInputs(year, month, day), "jYYYY-jM-jD").weekday();
}

export function createDate(year: number, month: number, day: number): DateObject {
  const _weekend = isWeekend({ year, month, day });
  const _decadeStart = getDecadeStart(year);

  const date: DateObject = { day, month, year, _m: month, _y: year, _weekend, _decadeStart };

  return date;
}

function createDateList(length: number, cb: (index: number) => DateObject) {
  return Array.from({ length }, (_, counter) => cb(counter));
}

export function getCurrentMonthDays(year: number, month: number): Array<DateObject> {
  return createDateList(getMonthLength(year, month), (counter) => createDate(year, month, counter + 1));
}

export function getPreviousMonthDays(year: number, month: number): Array<DateObject> {
  const currentFirstDay = weekday(year, month);

  const prevMonthAsTuple = helpers.getPrevMonthAsTuple(year, month);

  const daysCount = getMonthLength(...prevMonthAsTuple);

  return createDateList(currentFirstDay, (counter) => createDate(...prevMonthAsTuple, daysCount - counter)).reverse();
}

export function getNextMonthDays(year: number, month: number, count: number): Array<DateObject> {
  if (count < 1) return [];

  return createDateList(count, (counter) => createDate(...helpers.getNextMonthAsTuple(year, month), counter + 1));
}

export function isWeekend({ year, month, day }: DateObject) {
  return weekday(year, month, day ?? 1) === WEEKEND_INDEX;
}

export function getDefaultDate(): DateObject {
  const now = moment();

  const formats = ["jYYYY", "jM", "jD"] as const;

  const entries = formats.map((format) => Number(now.format(format))) as Tuple<typeof formats.length>;

  if (entries.some((entry) => !entry)) throw new Error("[tempo] cannot get current date");

  return { ...createDate(...entries), _current: true };
}

export function isDisabledDate(date: DateObject, disabledDates?: DisabledDates) {
  if (helpers.isArrayDisableDates(disabledDates) && disabledDates.some((predicate) => helpers.isDateEquals(date, predicate))) {
    return true;
  }

  if (helpers.isFunctionDisableDates(disabledDates)) {
    const instance = new DateInstance(date);

    return disabledDates(instance);
  }

  return false;
}

export function computeDays(year: number, month: number): Array<DateObject> {
  const key = helpers.joinInputs(year, month);

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
    date["_weekend"] = isWeekend(date);
    date["_decadeStart"] = getDecadeStart(date.year);

    return date;
  });

  cache.set(key, markedDays);

  if (cache.size > MAX_CACHE_SIZE) {
    cache.delete(cache.keys().next().value);
  }
  return markedDays;
}
