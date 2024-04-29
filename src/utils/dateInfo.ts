import { DateInfo, DateObject } from "@/types";

export const getDateInfo = (dateObject: DateObject): Readonly<DateInfo> => {
  const { day, month, year } = dateObject;

  return Object.freeze({ day, month, year });
};
