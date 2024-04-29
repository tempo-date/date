import { DateInfo } from "@/types";

export const formatDate = (date: DateInfo, format: string): string => {
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
