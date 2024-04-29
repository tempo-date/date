import { For, observer, useComputed } from "@legendapp/state/react";
import { useConsumeState } from "@/core/provider/hook";
import { MonthItem } from "./item";
import { getMonthsObject } from "@/core";
import styles from "./month.module.scss";

const Months = observer(() => {
  const state$ = useConsumeState();

  const data$ = useComputed(() => {
    return getMonthsObject(state$.date.year.get(true));
  });

  return (
    <div className={styles["tempo-panel-month-body"]}>
      <For each={data$} item={MonthItem} optimized />
    </div>
  );
});

export default Months;
