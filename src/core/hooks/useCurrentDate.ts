import { useTempoState } from "@/components/panel";
import { TempoDate } from "@/types";
import { ObservableObject, isObservableValueReady } from "@legendapp/state";

export const useCurrentDate = (item$: ObservableObject<TempoDate>) => {
  const state$ = useTempoState();

  const isDayEqual = state$.date.day.get() === item$.day.get();
  const isMonthEqual = state$.date.__m.get() === item$.month.get();
  const isYearEqual = state$.date.__y.get() === item$.year.get();

  return isObservableValueReady(item$) && isDayEqual && isMonthEqual && isYearEqual;
};
