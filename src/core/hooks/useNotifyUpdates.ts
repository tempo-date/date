/* eslint-disable react-hooks/exhaustive-deps */
import { when } from "@legendapp/state";
import { useIsMounted } from "@legendapp/state/react";
import { useEffect } from "react";
import { useSyncUpdates } from "./useSyncUpdates";
import { useConsumeState } from "../provider/hook";
import { InternalPickerProps } from "@/types";
import { getDateInfo } from "@/utils";
import { decadeIndex } from "../utilities";

export const useNotifyUpdates = (props: InternalPickerProps) => {
  const { broadcastTag, ...fns } = props;

  const state$ = useConsumeState();

  const mounted = useIsMounted();

  useSyncUpdates(broadcastTag);

  useEffect(() => {
    if (!mounted.get()) return undefined;

    return state$.date.onChange(({ value }) => {
      //INTERNALS
      when(!value._current, () => state$.date.month.set(value.month));

      fns.onChange?.(getDateInfo(value));
    });
  }, []);

  useEffect(() => {
    if (!mounted.get()) return undefined;

    return state$.date.day.onChange(({ value }) => {
      fns.onDayChange?.(value);
    });
  }, []);

  useEffect(() => {
    if (!mounted.get()) return undefined;

    return state$.date.month.onChange(({ value }) => {
      fns.onMonthChange?.(value);
    });
  }, []);

  useEffect(() => {
    if (!mounted.get()) return undefined;

    return state$.date.year.onChange(({ value }) => {
      //INTERNALS
      state$.date._decadeIndex.set(decadeIndex(value));

      fns.onYearChange?.(value);
    });
  }, []);
};
