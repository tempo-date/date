import { For, observer, useComputed } from "@legendapp/state/react";
import { useConsumeState } from "@/core/provider/hook";
import { YearItem } from "./item";
import { getYearsObject } from "@/core";
import styles from "./year.module.scss";

const Years = observer(() => {
  const state$ = useConsumeState();

  const data$ = useComputed(() => {
    return getYearsObject(state$.date._decadeIndex.get(true));
  });

  return (
    <div className={styles["tempo-panel-year-body"]}>
      <For each={data$} item={YearItem} optimized />
    </div>
  );
});

export default Years;
