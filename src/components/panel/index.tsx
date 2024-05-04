import { Fragment, ReactElement, ReactNode, Suspense, cloneElement, forwardRef, lazy, useCallback, useMemo, useRef } from "react";
import { Switch, reactiveObserver } from "@legendapp/state/react";
import { useConsumeState } from "@/core/provider/hook";
import { Mode, CustomRenderer, DayRendererProps } from "@/types";
import Header from "../header";
import styles from "./panel.module.scss";

const Days = lazy(() => import("../day"));
const Months = lazy(() => import("../month"));
const Years = lazy(() => import("../year"));

interface PanelProps {
  renderer?: CustomRenderer;
}

type RendererType = "day" | "month" | "year";

function getRendererType<P = any>(renderer: ReactElement<P>): RendererType {
  const _type = renderer.type;

  if (typeof _type === "string") return _type as RendererType;

  return (_type as React.JSXElementConstructor<any> & { _render: RendererType })["_render"];
}

const validateRenderer = (renderer?: CustomRenderer) => {
  const renderers: Record<RendererType, ReactElement<DayRendererProps>> = {
    day: <Fragment />,
    month: <Fragment />,
    year: <Fragment />,
  };

  if (!renderer) return renderers;

  if (Array.isArray(renderer)) {
    const [dayRenderer, ..._dayRenderers] = renderer.filter((r) => getRendererType(r) === "day");
    const [monthRenderer, ..._monthRenderers] = renderer.filter((r) => getRendererType(r) === "month");
    const [yearRenderer, ..._yearRenderers] = renderer.filter((r) => getRendererType(r) === "year");

    if (_dayRenderers.length > 0) {
      throw new Error("[tempo] many custom day components has been rendered");
    }

    if (_monthRenderers.length > 0) {
      throw new Error("[tempo] many custom month components has been rendered");
    }

    if (_yearRenderers.length > 0) {
      throw new Error("[tempo] many custom year components has been rendered");
    }

    renderers["day"] = dayRenderer;
    renderers["month"] = monthRenderer;
    renderers["year"] = yearRenderer;

    return renderers;
  }

  renderers[getRendererType(renderer)] = renderer;

  return renderers;
};

export const Panel = reactiveObserver(({ renderer }: PanelProps) => {
  const state$ = useConsumeState();

  const { day } = useMemo(() => validateRenderer(renderer), [renderer]);

  return (
    <div data-scope-id={state$._internal_id.peek()} className={styles["tempo-panel"]} dir="rtl">
      <Header />
      <Suspense fallback={<div className={styles["tempo-placeholder"]} />}>
        <Switch value={state$.mode.get()}>
          {{
            [Mode.DAY]: () => <Days $render={day} />,
            [Mode.MONTH]: () => <Months />,
            [Mode.YEAR]: () => <Years />,
            default: () => null,
          }}
        </Switch>
      </Suspense>
    </div>
  );
});
