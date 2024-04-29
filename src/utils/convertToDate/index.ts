import moment from "moment-jalaali";
import { DateObject } from "@/types";

export const convertToDate = (dateObject: DateObject): Date => {
  return moment(dateObject).toDate();
};
