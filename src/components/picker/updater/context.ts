import { createContext } from "react";
import { DatePickerProps } from "../picker.types";

export const Properties = createContext<Pick<DatePickerProps, "disabledDates">>({});
