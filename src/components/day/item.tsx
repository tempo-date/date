import { useCurrentDate } from "@/core/hooks";
import { useConsumeState } from "@/core/provider/hook";
import { CustomRenderer, DateObject, DayRendererProps, DisabledDates } from "@/types";
import { ObservableObject, batch } from "@legendapp/state";
import { Memo, observer, useSelector } from "@legendapp/state/react";
import styles from "./day.module.scss";
import { cn } from "@/utils";
import { isDisabledDate } from "@/core";
import { ReactElement } from "react";

interface DayItemProps {
  item$: ObservableObject<DateObject>;
  disabledDates?: DisabledDates;
  render?: ReactElement<DayRendererProps>;
}

export const DayItem = observer(({ item$, render, disabledDates }: DayItemProps) => {
  const state$ = useConsumeState();

  const isActive = useCurrentDate(item$);

  const isDisabled = useSelector(() => isDisabledDate(item$.get(), disabledDates));

  const isWeekend = useSelector(item$._weekend);

  const isCurrent = useSelector(item$._current);

  const select = () => {
    if (isDisabled) return;

    batch(() => {
      state$.date._m.set(item$.month.get(true));
      state$.date.set(item$.get(true));
    });
  };

  if (render) return render.props.children({ isActive, isCurrent, isDisabled, isWeekend, select });

  // TODO: provide aria attributes
  return (
    <div
      id="day-renderer"
      onClick={select}
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
