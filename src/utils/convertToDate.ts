import { DateObject } from "@/types";
import moment from "moment-jalaali";

export const convertToDate = (dateObject: DateObject): Date => {
  return moment(dateObject).toDate();
};
