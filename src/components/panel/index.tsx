import { Suspense, lazy } from "react";
import { Switch, observer } from "@legendapp/state/react";
import { useConsumeState } from "@/core/provider/hook";
import { Mode } from "@/types";
import Header from "../header";
import styles from "./panel.module.scss";

const Days = lazy(() => import("../day"));
const Months = lazy(() => import("../month"));
const Years = lazy(() => import("../year"));

export const Panel = observer(() => {
  const state$ = useConsumeState();

  return (
    <div className={styles["tempo-panel"]} dir="rtl">
      <Header />
      <Suspense fallback={<div className={styles["tempo-placeholder"]} />}>
        <Switch value={state$.mode.get()}>
          {{
            [Mode.DAY]: () => <Days />,
            [Mode.MONTH]: () => <Months />,
            [Mode.YEAR]: () => <Years />,
            default: () => null,
          }}
        </Switch>
      </Suspense>
    </div>
  );
});
