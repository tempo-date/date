import { DisabledDates, InternalPickerProps, PersistenceOptions } from "@/types";

export interface DatePickerProps extends InternalPickerProps {
  persistOptions?: PersistenceOptions;
  disabledDates?: DisabledDates;
}
