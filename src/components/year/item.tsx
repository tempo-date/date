import { useConsumeState } from "@/core/provider/hook";
import { Mode, YearObject } from "@/types";
import { ObservableObject, batch } from "@legendapp/state";
import { observer, useSelector } from "@legendapp/state/react";
import styles from "./year.module.scss";
import { cn } from "@/utils";

interface YearItemProps {
  item$: ObservableObject<YearObject>;
}

export const YearItem = observer(({ item$ }: YearItemProps) => {
  const state$ = useConsumeState();

  const isActive = useSelector(() => item$.year.get() === state$.date.year.get());

  const select = () => {
    batch(() => {
      state$.date.year.set(item$.year.get(true));
      state$.mode.set(Mode.MONTH);
    });
  };

  return (
    <div
      className={cn(styles["tempo-year"], {
        [styles["tempo-year-active"]]: isActive,
        [styles["tempo-year-neighbor"]]: !item$._current.get(true),
      })}
      onClick={select}
    >
      <span
        className={cn(styles["tempo-year-text"], {
          [styles["tempo-year-active-text"]]: isActive,
        })}
      >
        {item$.year.get()}
      </span>
    </div>
  );
});
