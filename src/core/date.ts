import { DateObject, MonthObject, Tuple } from "@/types";
import { MONTHS } from "./constants/months";
import moment from "moment-jalaali";

const DAYS_COUNT = 42;
const LAST_MONTH = 12;
const FIRST_MONTH = 1;
const WEEKEND_INDEX = 6;

const inc = (count: number) => count + 1;
const dec = (count: number) => count - 1;

export function monthStructure(year: number): Array<MonthObject> {
  return MONTHS.map((name, index) => ({ name, year, month: inc(index) }));
}

export function getMonthLength(year: number, month: number) {
  return moment.jDaysInMonth(year, month);
}

export function getMonthName(year: number, month: number | undefined) {
  const m = monthStructure(year).find((struct) => struct.month === month);

  if (m) return m.name;
}

function join(...inputs: number[]) {
  return inputs.join("-");
}

export function weekday(year: number, month: number, day = 1) {
  return moment(join(year, month, day), "jYYYY-jM-jD").weekday();
}

export function createDate(y: number, m: number, d: number): DateObject {
  const day = { day: d, month: m, year: y, __m: m, __y: y };

  return day;
}

function createDateList(length: number, cb: (index: number) => DateObject) {
  return Array.from({ length }, (_, counter) => cb(counter));
}

function getPrevMonthAsTuple(year: number, month: number): Tuple<2> {
  if (month === FIRST_MONTH) return [dec(year), LAST_MONTH];

  return [year, dec(month)];
}

function getNextMonthAsTuple(year: number, month: number): Tuple<2> {
  if (month === LAST_MONTH) return [inc(year), FIRST_MONTH];

  return [year, inc(month)];
}

export function getCurrentMonthDays(year: number, month: number): Array<DateObject> {
  return createDateList(getMonthLength(year, month), (counter) => createDate(year, month, inc(counter)));
}

export function getPreviousMonthDays(year: number, month: number): Array<DateObject> {
  const currentFirstDay = weekday(year, month);

  const prevMonthAsTuple = getPrevMonthAsTuple(year, month);

  const daysCount = getMonthLength(...prevMonthAsTuple);

  return createDateList(currentFirstDay, (counter) => createDate(...prevMonthAsTuple, daysCount - counter)).reverse();
}

export function getNextMonthDays(year: number, month: number, count: number): Array<DateObject> {
  if (count < 1) return [];

  return createDateList(count, (counter) => createDate(...getNextMonthAsTuple(year, month), inc(counter)));
}

function getWeekend({ year, month, day }: DateObject) {
  return weekday(year, month, day ?? 1) === WEEKEND_INDEX;
}

export function getDays(year: number, month: number): Array<DateObject> {
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
    date["_weekend"] = getWeekend(date);

    return date;
  });

  return markedDays;
}

export function getDefaultDate(): DateObject {
  const now = moment();

  const year = Number(now.format("jYYYY"));
  const month = Number(now.format("jM"));
  const day = Number(now.format("jD"));

  if (!year || !month || !day) throw new Error("[tempo] cannot get current date");

  const date = createDate(year, month, day);

  const _weekend = getWeekend({ year, month, day });

  return { ...date, _weekend, _current: true };
}
