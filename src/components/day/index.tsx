import { For, observer, reactiveObserver, useComputed } from "@legendapp/state/react";
import { useConsumeState } from "@/core/provider/hook";
import { DayItem } from "./item";
import { useProperties } from "../picker/updater/hook";
import { computeDays } from "@/core";
import styles from "./day.module.scss";
import { ReactElement, ReactNode } from "react";
import { CustomRenderer, DayRendererProps } from "@/types";

interface DaysProps {
  render?: ReactElement<DayRendererProps>;
}

const Days = reactiveObserver(({ render }: DaysProps) => {
  const state$ = useConsumeState();

  const { disabledDates } = useProperties();

  const data$ = useComputed(() => {
    const year = state$.date.year.get(true);
    const month = state$.date.month.get(true);

    return computeDays(year, month);
  }, []);

  return (
    <div className={styles["tempo-panel-day-body"]}>
      <For each={data$} item={DayItem} itemProps={{ disabledDates, render }} optimized />
    </div>
  );
});

export default Days;
