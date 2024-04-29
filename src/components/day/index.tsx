import { For, observer, useComputed } from "@legendapp/state/react";
import styles from "./day.module.scss";
import { useConsumeState } from "@/core/provider/hook";
import { DayItem } from "./item";
import { computeDays } from "@/core";

const Days = observer(() => {
  const state$ = useConsumeState();

  const data$ = useComputed(() => {
    const year = state$.date.year.get(true);
    const month = state$.date.month.get(true);

    return computeDays(year, month);
  });

  return (
    <div className={styles["tempo-panel-day-body"]}>
      <For each={data$} item={DayItem} optimized />
    </div>
  );
});

export default Days;
