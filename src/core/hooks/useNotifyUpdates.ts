/* eslint-disable react-hooks/exhaustive-deps */
import { when } from "@legendapp/state";
import { useIsMounted } from "@legendapp/state/react";
import { useEffect } from "react";
import { useSyncUpdates } from "./useSyncUpdates";
import { useConsumeState } from "../provider/hook";
import { InternalPickerProps } from "@/types";
import { getDateInfo } from "@/utils/dateInfo";

export const useNotifyUpdates = (props: InternalPickerProps) => {
  const state$ = useConsumeState();

  const mounted = useIsMounted();

  useSyncUpdates(props.broadcastTag);

  useEffect(() => {
    if (!mounted.get()) return undefined;

    return state$.date.onChange(({ value }) => {
      props.onChange?.(getDateInfo(value));

      when(!value._current, () => state$.date.month.set(value.month));
    });
  }, []);

  useEffect(() => {
    if (!mounted.get()) return undefined;

    return state$.date.day.onChange(({ value }) => {
      props.onDayChange?.(value);
    });
  }, []);

  useEffect(() => {
    if (!mounted.get()) return undefined;

    return state$.date.month.onChange(({ value }) => {
      props.onMonthChange?.(value);
    });
  }, []);

  useEffect(() => {
    if (!mounted.get()) return undefined;

    return state$.date.year.onChange(({ value }) => {
      props.onYearChange?.(value);
    });
  }, []);
};
