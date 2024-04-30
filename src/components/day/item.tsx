import { useCurrentDate } from "@/core/hooks";
import { useConsumeState } from "@/core/provider/hook";
import { DateObject, DisabledDates } from "@/types";
import { ObservableObject, batch } from "@legendapp/state";
import { Memo, observer, useSelector } from "@legendapp/state/react";
import styles from "./day.module.scss";
import { cn } from "@/utils";
import { isDisabledDate } from "@/core";

interface DayItemProps {
  item$: ObservableObject<DateObject>;
  disabledDates?: DisabledDates;
}

export const DayItem = observer(({ item$, disabledDates }: DayItemProps) => {
  const state$ = useConsumeState();

  const isActive = useCurrentDate(item$);

  const isDisabled = useSelector(() => isDisabledDate(item$.get(), disabledDates));

  const isWeekend = useSelector(item$._weekend);

  const isCurrent = useSelector(item$._current);

  const onSelectDay = () => {
    if (isDisabled) return;

    batch(() => {
      state$.date._m.set(item$.month.get(true));
      state$.date.set(item$.get(true));
    });
  };

  // TODO: provide aria attributes
  return (
    <div
      onClick={onSelectDay}
      className={cn(styles["tempo-day"], {
        [styles["tempo-day-neighbor"]]: !isCurrent,
        [styles["tempo-day-disabled"]]: isDisabled,
        [styles["tempo-day-active"]]: isActive,
      })}
    >
      <span
        className={cn(styles["tempo-day-text"], {
          [styles["tempo-day-weekend"]]: isWeekend,
          [styles["tempo-day-disabled-text"]]: isDisabled,
          [styles["tempo-day-active-text"]]: isActive,
        })}
      >
        <Memo>{() => item$.day.get()}</Memo>
      </span>
    </div>
  );
});
