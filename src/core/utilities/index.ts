import moment from "moment-jalaali";
import { DateObject, MonthObject, Tuple, YearObject } from "@/types";
import { MONTHS } from "../constants";
import { DAYS_COUNT, DECADE, FIRST_MONTH, LAST_MONTH, MAX_CACHE_SIZE, WEEKEND_INDEX } from "../constants/internals";
import cache from "../cache";

export function getDecade(year: number) {
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

function join(...inputs: number[]) {
  return inputs.join("-");
}

export function weekday(year: number, month: number, day = 1) {
  return moment(join(year, month, day), "jYYYY-jM-jD").weekday();
}

export function createDate(year: number, month: number, day: number): DateObject {
  const _weekend = isWeekend({ year, month, day });
  const _decade = getDecade(year);

  const date: DateObject = { day, month, year, _m: month, _y: year, _weekend, _decade };

  return date;
}

function createDateList(length: number, cb: (index: number) => DateObject) {
  return Array.from({ length }, (_, counter) => cb(counter));
}

function getPrevMonthAsTuple(year: number, month: number): Tuple<2> {
  if (month === FIRST_MONTH) return [year - 1, LAST_MONTH];

  return [year, month - 1];
}

function getNextMonthAsTuple(year: number, month: number): Tuple<2> {
  if (month === LAST_MONTH) return [year + 1, FIRST_MONTH];

  return [year, month + 1];
}

export function getCurrentMonthDays(year: number, month: number): Array<DateObject> {
  return createDateList(getMonthLength(year, month), (counter) => createDate(year, month, counter + 1));
}

export function getPreviousMonthDays(year: number, month: number): Array<DateObject> {
  const currentFirstDay = weekday(year, month);

  const prevMonthAsTuple = getPrevMonthAsTuple(year, month);

  const daysCount = getMonthLength(...prevMonthAsTuple);

  return createDateList(currentFirstDay, (counter) => createDate(...prevMonthAsTuple, daysCount - counter)).reverse();
}

export function getNextMonthDays(year: number, month: number, count: number): Array<DateObject> {
  if (count < 1) return [];

  return createDateList(count, (counter) => createDate(...getNextMonthAsTuple(year, month), counter + 1));
}

function isWeekend({ year, month, day }: DateObject) {
  return weekday(year, month, day ?? 1) === WEEKEND_INDEX;
}

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
    date["_decade"] = getDecade(date.year);
    date["_weekend"] = isWeekend(date);

    return date;
  });

  cache.set(key, markedDays);

  if (cache.size > MAX_CACHE_SIZE) {
    cache.delete(cache.keys().next().value);
  }

  return markedDays;
}

export function getDefaultDate(): DateObject {
  const now = moment();

  const formats = ["jYYYY", "jM", "jD"] as const;

  const entries = formats.map((format) => Number(now.format(format))) as Tuple<typeof formats.length>;

  if (entries.some((entry) => !entry)) throw new Error("[tempo] cannot get current date");

  return { ...createDate(...entries), _current: true };
}
