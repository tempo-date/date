import { Fragment } from "react";
import { Show, observer } from "@legendapp/state/react";
import MonthForward from "@/assets/icons/chevron-left.svg?react";
import MonthBackward from "@/assets/icons/chevron-right.svg?react";
import YearForward from "@/assets/icons/chevrons-left.svg?react";
import YearBackward from "@/assets/icons/chevrons-right.svg?react";
import { useConsumeState } from "@/core/provider/hook";
import { useNavigation } from "@/core/hooks";
import { Mode } from "@/types";
import { getDecadeBounds, getMonthName } from "@/core";
import { batch } from "@legendapp/state";
import styles from "./header.module.scss";

const DefaultHeader = observer(() => {
  const state$ = useConsumeState();

  const { onNextMonth, onPreviousMonth, onNextYear, onPreviousYear } = useNavigation();

  return (
    <div className={styles["tempo-panel-header"]}>
      <div className={styles["tempo-header-nav"]}>
        <YearBackward className="size-[14px] cursor-pointer" onPointerDown={onPreviousYear} />
        <MonthBackward className="size-[14px] cursor-pointer" onPointerDown={onPreviousMonth} />
      </div>
      <div className={styles["tempo-header"]}>
        <span className={styles["tempo-header-text"]} onPointerDown={() => state$.mode.set(Mode.MONTH)}>
          <Show if={state$.date.month} else={<Fragment />}>
            {(month) => getMonthName(state$.date.year.peek(), month)}
          </Show>
        </span>
        <span className={styles["tempo-header-text"]} onPointerDown={() => state$.mode.set(Mode.YEAR)}>
          <Show if={state$.date.year} else={<Fragment />}>
            {(year) => year}
          </Show>
        </span>
      </div>
      <div className={styles["tempo-header-nav"]}>
        <MonthForward className="size-[14px] cursor-pointer" onPointerDown={onNextMonth} />
        <YearForward className="size-[14px] cursor-pointer" onPointerDown={onNextYear} />
      </div>
    </div>
  );
});

const DecadeHeader = observer(() => {
  const state$ = useConsumeState();

  const { onNextDecade, onPreviousDecade } = useNavigation();

  const [start, end] = getDecadeBounds(state$.date._decadeStart.get(true));

  const onSelectDecadeYear = (year: number) => {
    batch(() => {
      state$.date.year.set(year);
      state$.mode.set(Mode.MONTH);
    });
  };

  return (
    <div className={styles["tempo-panel-header"]}>
      <div className={styles["tempo-header-nav"]}>
        <YearBackward className="size-[14px] cursor-pointer" onPointerDown={onPreviousDecade} />
      </div>
      <div className={styles["tempo-header"]}>
        <span className={styles["tempo-header-text"]} onPointerDown={() => onSelectDecadeYear(start)}>
          {start}
        </span>
        <span className={styles["tempo-header-text"]}>تا</span>
        <span className={styles["tempo-header-text"]} onPointerDown={() => onSelectDecadeYear(end)}>
          {end}
        </span>
      </div>
      <div className={styles["tempo-header-nav"]}>
        <YearForward className="size-[14px] cursor-pointer" onPointerDown={onNextDecade} />
      </div>
    </div>
  );
});

const Header = () => {
  const state$ = useConsumeState();

  return (
    <Show if={state$.mode.get() === Mode.YEAR} else={<DefaultHeader />}>
      {() => <DecadeHeader />}
    </Show>
  );
};

export default Header;
