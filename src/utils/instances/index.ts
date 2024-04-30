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

  public isAfter(info: DateInfo) {
    return helpers.isSomeGreaterThan(this.date, info);
  }

  public isSame(info: DateInfo) {
    return helpers.isDateEquals(this.date, info);
  }
}
