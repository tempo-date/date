import { TempoDate } from "@/types";
import { ObservableObject, batch } from "@legendapp/state";
import { For, observer, useComputed } from "@legendapp/state/react";
import styles from "./day.module.scss";
import { getDays } from "@/core/date";
import { cn } from "@/utils/cn";
import { useTempoState } from "../panel";
import { useCurrentDate } from "@/core/hooks";

interface DayItemProps {
  item$: ObservableObject<TempoDate>;
}

const DayItem = observer(({ item$ }: DayItemProps) => {
  const state$ = useTempoState();

  const isCurrent = useCurrentDate(item$);

  const onSelectDay = () => {
    batch(() => {
      state$.date.__m.set(item$.month.get(true));
      state$.date.set(item$.get(true));
    });
  };

  return (
    <div
      className={cn(styles["tempo-day"], {
        [styles["tempo-day-neighbor"]]: !item$._current.get(true),
        [styles["tempo-day-active"]]: isCurrent,
      })}
      onClick={onSelectDay}
    >
      <span
        className={cn(styles["tempo-day-text"], {
          [styles["tempo-day-weekend"]]: item$._weekend.get(true),
          [styles["tempo-day-active-text"]]: isCurrent,
        })}
      >
        {item$.day.get()}
      </span>
    </div>
  );
});

export const Days = observer(() => {
  const state$ = useTempoState();

  const data$ = useComputed(() => {
    const year = state$.date.year.peek();
    const month = state$.date.month.get(true);

    return getDays(year, month);
  });

  return (
    <div className={styles["tempo-panel-day-body"]}>
      <For each={data$} item={DayItem} optimized />
    </div>
  );
});
