import { For, observer, useComputed } from "@legendapp/state/react";
import { useConsumeState } from "@/core/provider/hook";
import { DayItem } from "./item";
import { computeDays } from "@/core/utilities/days";
import { useProperties } from "../picker/updater/hook";
import styles from "./day.module.scss";

const Days = observer(() => {
  const state$ = useConsumeState();

  const { disabledDates } = useProperties();

  const data$ = useComputed(() => {
    const year = state$.date.year.get(true);
    const month = state$.date.month.get(true);

    return computeDays(year, month);
  }, []);

  return (
    <div className={styles["tempo-panel-day-body"]}>
      <For each={data$} item={DayItem} itemProps={{ disabledDates }} optimized />
    </div>
  );
});

export default Days;
