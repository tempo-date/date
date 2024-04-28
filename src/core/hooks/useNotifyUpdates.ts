/* eslint-disable react-hooks/exhaustive-deps */
import { useTempoState } from "@/components/panel";
import { DatePickerProps } from "@/types";
import { when } from "@legendapp/state";
import { useIsMounted } from "@legendapp/state/react";
import { useEffect } from "react";
import { useSyncUpdates } from "./useSyncUpdates";

export const useNotifyUpdates = ({ onChange, onDayChange, onMonthChange, onYearChange, syncIdentifier }: DatePickerProps) => {
  const state$ = useTempoState();

  const mounted = useIsMounted();

  useSyncUpdates(syncIdentifier);

  useEffect(() => {
    if (!mounted.get()) return undefined;

    return state$.date.onChange(({ value }) => {
      onChange?.(value);

      when(!value._current, () => {
        state$.date.month.set(value.month);
      });
    });
  }, []);

  useEffect(() => {
    if (!mounted.get()) return undefined;

    return state$.date.day.onChange(({ value }) => {
      onDayChange?.(value);
    });
  }, []);

  useEffect(() => {
    if (!mounted.get()) return undefined;

    return state$.date.month.onChange(({ value }) => {
      onMonthChange?.(value);
    });
  }, []);

  useEffect(() => {
    if (!mounted.get()) return undefined;

    return state$.date.year.onChange(({ value }) => {
      onYearChange?.(value);
    });
  }, []);
};
