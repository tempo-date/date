import { useCurrentDate } from "@/core/hooks";
import { useConsumeState } from "@/core/provider/hook";
import { DateObject } from "@/types";
import { ObservableObject, batch } from "@legendapp/state";
import { observer } from "@legendapp/state/react";
import styles from "./day.module.scss";
import { cn } from "@/utils";

interface DayItemProps {
  item$: ObservableObject<DateObject>;
}

export const DayItem = observer(({ item$ }: DayItemProps) => {
  const state$ = useConsumeState();

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
