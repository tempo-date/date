import { DateObject } from "@/types";
import { ObservableObject, isObservableValueReady } from "@legendapp/state";
import { useConsumeState } from "../provider/hook";

export const useCurrentDate = (item$: ObservableObject<DateObject>) => {
  const state$ = useConsumeState();

  const isDayEqual = state$.date.day.get() === item$.day.get();
  const isMonthEqual = state$.date._m.get() === item$.month.get();
  const isYearEqual = state$.date._y.get() === item$.year.get();

  return isObservableValueReady(item$) && isDayEqual && isMonthEqual && isYearEqual;
};
