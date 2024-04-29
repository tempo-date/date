import { For, observer, useComputed } from "@legendapp/state/react";
import { monthStructure } from "@/core/date";
import { useConsumeState } from "@/core/provider/hook";
import { MonthItem } from "./item";
import styles from "./month.module.scss";

const Months = observer(() => {
  const state$ = useConsumeState();

  const data$ = useComputed(() => {
    return monthStructure(state$.date.year.peek());
  });

  return (
    <div className={styles["tempo-panel-month-body"]}>
      <For each={data$} item={MonthItem} optimized />
    </div>
  );
});

export default Months;
