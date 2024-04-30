import * as helpers from "@/core";
import { DateInfo, DateObject } from "@/types";

export class DateInstance {
  private date: DateObject;

  constructor(date: DateObject) {
    this.date = date;
  }

  public isBefore(info: DateInfo) {
    return helpers.isSomeLessThan(this.date, info);
  }

  public isSameOrBefore(info: DateInfo) {
    return helpers.isSomeEqualOrLessThan(this.date, info);
  }

  public isAfter(info: DateInfo) {
    return helpers.isSomeGreaterThan(this.date, info);
  }

  public isSameOrAfter(info: DateInfo) {
    return helpers.isSomeEqualOrGreaterThan(this.date, info);
  }

  public isSame(info: DateInfo) {
    return helpers.isDateEquals(this.date, info);
  }

  public isBetween(bounds: [DateInfo, DateInfo]) {
    this.replaceIndices(bounds);

    return this.isAfter(bounds[0]) && this.isBefore(bounds[1]);
  }

  public isSameOrBetween(bounds: [DateInfo, DateInfo]) {
    this.replaceIndices(bounds);

    return this.isSameOrAfter(bounds[0]) && this.isSameOrBefore(bounds[1]);
  }

  private replaceIndices(bounds: [DateInfo, DateInfo]) {
    if (helpers.isSomeGreaterThan(bounds[0], bounds[1])) {
      const temp = bounds[0];

      bounds[0] = bounds[1];

      bounds[1] = temp;
    }
  }
}
