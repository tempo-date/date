import moment from "moment-jalaali";
import { DateInfo, DateObject, DisabledDates, MonthObject, Tuple, YearObject } from "@/types";
import { MONTHS } from "../constants";
import { DECADE, FIRST_MONTH, LAST_MONTH, WEEKEND_INDEX } from "../constants/internals";
import { DateInstance } from "@/utils";

export function decadeIndex(year: number) {
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

export function join(...inputs: number[]) {
  return inputs.join("-");
}

export function weekday(year: number, month: number, day = 1) {
  return moment(join(year, month, day), "jYYYY-jM-jD").weekday();
}

export function createDate(year: number, month: number, day: number): DateObject {
  const _weekend = isWeekend({ year, month, day });
  const _decadeIndex = decadeIndex(year);

  const date: DateObject = { day, month, year, _m: month, _y: year, _weekend, _decadeIndex };

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

function isArrayDisableDates(disabledDates?: DisabledDates): disabledDates is Array<DateInfo> {
  return !!disabledDates && Array.isArray(disabledDates);
}

function isFunctionDisableDates(disabledDates?: DisabledDates): disabledDates is (instance: DateInstance) => boolean {
  return !!disabledDates && typeof disabledDates === "function";
}

export function isDateEquals(date: DateObject, compareDate: DateObject) {
  return date.year === compareDate.year && date.month === compareDate.month && date.day === compareDate.day;
}

export function isGreaterThan(date1: DateObject, date2: DateObject, strategy: keyof DateInfo) {
  switch (strategy) {
    case "year": {
      return date1.year > date2.year;
    }
    case "month": {
      return date1.month > date2.month;
    }
    case "day": {
      return date1.day > date2.day;
    }
    default:
      return false;
  }
}

export function isLessThan(date1: DateObject, date2: DateObject, strategy: keyof DateInfo) {
  switch (strategy) {
    case "year": {
      return date1.year < date2.year;
    }
    case "month": {
      return date1.month < date2.month;
    }
    case "day": {
      return date1.day < date2.day;
    }
    default:
      return false;
  }
}

export function isSomeLessThan(date1: DateObject, date2: DateObject) {
  return isLessThan(date1, date2, "year") || isLessThan(date1, date2, "month") || isLessThan(date1, date2, "day");
}

export function isEveryLessThan(date1: DateObject, date2: DateObject) {
  return isLessThan(date1, date2, "year") && isLessThan(date1, date2, "month") && isLessThan(date1, date2, "day");
}

export function isSomeGreaterThan(date1: DateObject, date2: DateObject) {
  return isGreaterThan(date1, date2, "year") || isGreaterThan(date1, date2, "month") || isGreaterThan(date1, date2, "day");
}

export function isEveryGreaterThan(date1: DateObject, date2: DateObject) {
  return isGreaterThan(date1, date2, "year") && isGreaterThan(date1, date2, "month") && isGreaterThan(date1, date2, "day");
}

export function isDisabledDate(date: DateObject, disabledDates?: DisabledDates) {
  if (isArrayDisableDates(disabledDates) && disabledDates.some((predicate) => isDateEquals(date, predicate))) {
    return true;
  }

  if (isFunctionDisableDates(disabledDates)) {
    const instance = new DateInstance(date);

    return disabledDates(instance);
  }

  return false;
}
