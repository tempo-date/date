import { DayRendererProps } from "@/types";
import { ReactNode } from "react";
import { createPortal } from "react-dom";

{
  /* <div
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
</div> */
}

const DayRenderer = ({ children }: DayRendererProps) => {
  return null;
};

Object.defineProperty(DayRenderer, "_render", { value: "day", writable: false });

export default DayRenderer;
