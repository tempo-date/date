/* eslint-disable react-hooks/exhaustive-deps */
import { useTempoState } from "@/components/panel";
import { DatePickerProps, TempoDate } from "@/types";
import { when } from "@legendapp/state";
import { useIsMounted, useObserveEffect } from "@legendapp/state/react";
import { useEffect } from "react";

export const useNotifyUpdates = ({ onChange, onDayChange, onMonthChange, onYearChange }: DatePickerProps) => {
  const store$ = useTempoState();

  const mounted = useIsMounted();

  useObserveEffect<TempoDate>(store$.date, async ({ value }) => {
    if (value) {
      await when(!value._current, () => {
        store$.date.month.set(value.month);
      });

      onChange?.(value);
    }
  });

  useEffect(() => {
    if (!mounted.get()) return undefined;

    return store$.date.day.onChange(({ value }) => {
      onDayChange?.(value);
    });
  }, []);

  useEffect(() => {
    if (!mounted.get()) return undefined;

    return store$.date.month.onChange(({ value }) => {
      onMonthChange?.(value);
    });
  }, []);

  useEffect(() => {
    if (!mounted.get()) return undefined;

    return store$.date.year.onChange(({ value }) => {
      onYearChange?.(value);
    });
  }, []);
};
