import { Fragment } from "react";
import styles from "./header.module.scss";
import { Show, observer } from "@legendapp/state/react";
import { getMonthName } from "@/core/date";
import MonthForward from "@/assets/icons/chevron-left.svg?react";
import MonthBackward from "@/assets/icons/chevron-right.svg?react";
import YearForward from "@/assets/icons/chevrons-left.svg?react";
import YearBackward from "@/assets/icons/chevrons-right.svg?react";
import { Mode } from "@/types";
import { useConsumeState } from "@/core/provider/hook";

const Header = observer(() => {
  const state$ = useConsumeState();

  return (
    <div className={styles["tempo-panel-header"]}>
      <div className={styles["tempo-header-nav"]}>
        <YearBackward className="size-[14px] cursor-pointer" />
        <MonthBackward className="size-[14px] cursor-pointer" />
      </div>
      <div className={styles["tempo-header"]}>
        <span className={styles["tempo-header-text"]} onClick={() => state$.mode.set(Mode.MONTH)}>
          <Show if={state$.date.month} else={<Fragment />}>
            {(month) => getMonthName(state$.date.year.peek(), month)}
          </Show>
        </span>
        <span className={styles["tempo-header-text"]} onClick={() => state$.mode.set(Mode.YEAR)}>
          <Show if={state$.date.year} else={<Fragment />}>
            {(year) => year}
          </Show>
        </span>
      </div>
      <div className={styles["tempo-header-nav"]}>
        <MonthForward className="size-[14px] cursor-pointer" />
        <YearForward className="size-[14px] cursor-pointer" />
      </div>
    </div>
  );
});

export default Header;
