import { FIRST_MONTH, LAST_MONTH } from "@/core/constants/internals";
import { DateInstance } from "@/utils";
import type { DateInfo, DateObject, DisabledDates, Tuple } from "@/types";

export function joinInputs(...inputs: number[]) {
  return inputs.join("-");
}

export function getPrevMonthAsTuple(year: number, month: number): Tuple<2> {
  if (month === FIRST_MONTH) return [year - 1, LAST_MONTH];

  return [year, month - 1];
}

export function getNextMonthAsTuple(year: number, month: number): Tuple<2> {
  if (month === LAST_MONTH) return [year + 1, FIRST_MONTH];

  return [year, month + 1];
}

export function isArrayDisableDates(disabledDates?: DisabledDates): disabledDates is Array<DateInfo> {
  return !!disabledDates && Array.isArray(disabledDates);
}

export function isFunctionDisableDates(disabledDates?: DisabledDates): disabledDates is (instance: DateInstance) => boolean {
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

export function isEqualGreaterThan(date1: DateObject, date2: DateObject, strategy: keyof DateInfo) {
  switch (strategy) {
    case "year": {
      return date1.year > date2.year;
    }
    case "month": {
      return date1.month > date2.month;
    }
    case "day": {
      return date1.day >= date2.day;
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

export function isEqualOrLessThan(date1: DateObject, date2: DateObject, strategy: keyof DateInfo) {
  switch (strategy) {
    case "year": {
      return date1.year < date2.year;
    }
    case "month": {
      return date1.month < date2.month;
    }
    case "day": {
      return date1.day <= date2.day;
    }
    default:
      return false;
  }
}

export function isSomeLessThan(date1: DateObject, date2: DateObject) {
  return isLessThan(date1, date2, "year") || isLessThan(date1, date2, "month") || isLessThan(date1, date2, "day");
}

export function isSomeEqualOrLessThan(date1: DateObject, date2: DateObject) {
  return isEqualOrLessThan(date1, date2, "year") || isEqualOrLessThan(date1, date2, "month") || isEqualOrLessThan(date1, date2, "day");
}

export function isSomeGreaterThan(date1: DateObject, date2: DateObject) {
  return isGreaterThan(date1, date2, "year") || isGreaterThan(date1, date2, "month") || isGreaterThan(date1, date2, "day");
}

export function isSomeEqualOrGreaterThan(date1: DateObject, date2: DateObject) {
  return isEqualGreaterThan(date1, date2, "year") || isEqualGreaterThan(date1, date2, "month") || isEqualGreaterThan(date1, date2, "day");
}
