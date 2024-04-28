import { TempoDate } from "@/types";

// year signature: YYYY/YY
// month signature: MM
// day signature: DD

export const parseFormat = (format: string, date: TempoDate): string => {
  if (!date.day) return "";

  const year = date.year.toString();

  const month = date.month.toString().padStart(2, "0");

  const day = date.day.toString().padStart(2, "0");

  const formattedDate = format.replace(/YYYY|YY|MM|DD/g, (match) => {
    switch (match) {
      case "YYYY":
        return year;
      case "YY":
        return year.slice(-2);
      case "MM":
        return month;
      case "DD":
        return day;
      default:
        return match;
    }
  });

  return formattedDate;
};
