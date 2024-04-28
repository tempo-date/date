import { Mode, MonthStruct } from "@/types";
import { ObservableObject, batch } from "@legendapp/state";
import { For, observer, useComputed, useSelector } from "@legendapp/state/react";
import styles from "./month.module.scss";
import { monthStructure } from "@/core/date";
import { cn } from "@/utils";
import { useTempoState } from "../panel";

interface MonthItemProps {
  item$: ObservableObject<MonthStruct>;
}

const MonthItem = ({ item$ }: MonthItemProps) => {
  const state$ = useTempoState();

  const isCurrent = useSelector(() => item$.month.get(true) === state$.date.month.get(true));

  const onSelectMonth = () => {
    batch(() => {
      state$.date.month.set(item$.month.get(true));
      state$.date.__y.set(item$.year.get(true));
      state$.mode.set(Mode.DAY);
    });
  };

  return (
    <div
      className={cn(styles["tempo-month"], {
        [styles["tempo-month-active"]]: isCurrent,
      })}
      onClick={onSelectMonth}
    >
      <span
        className={cn(styles["tempo-month-text"], {
          [styles["tempo-month-active-text"]]: isCurrent,
        })}
      >
        {item$.name.get()}
      </span>
    </div>
  );
};

export const Months = observer(() => {
  const state$ = useTempoState();

  const data$ = useComputed(() => {
    return monthStructure(state$.date.year.peek());
  });

  return (
    <div className={styles["tempo-panel-month-body"]}>
      <For each={data$} item={MonthItem} optimized />
    </div>
  );
});
