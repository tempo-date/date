import { useConsumeState } from "@/core/provider/hook";
import { Mode, MonthObject } from "@/types";
import { ObservableObject, batch } from "@legendapp/state";
import { observer, useSelector } from "@legendapp/state/react";
import styles from "./month.module.scss";
import { cn } from "@/utils";

interface MonthItemProps {
  item$: ObservableObject<MonthObject>;
}

export const MonthItem = observer(({ item$ }: MonthItemProps) => {
  const state$ = useConsumeState();

  const isCurrent = useSelector(() => item$.month.get() === state$.date.month.get());

  const onSelectMonth = () => {
    batch(() => {
      state$.date.month.set(item$.month.get(true));
      state$.date._y.set(item$.year.get(true));
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
});
