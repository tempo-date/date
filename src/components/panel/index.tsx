import styles from "./panel.module.scss";
import { Switch, observer, useObservable } from "@legendapp/state/react";
import { DatePickerProps, Mode, TempoDate } from "@/types";
import { Days } from "../day";
import { useNotifyUpdates } from "@/core/hooks";
import { Header } from "../header";
import { Months } from "../month";
import { defaultDate } from "@/core/date";
import { createContext, useContext } from "react";
import { ObservableObject, observable } from "@legendapp/state";

type Nullable<T> = T | null;

interface TempoState {
  mode: Mode;
  date: Nullable<TempoDate>;
}

interface UpdaterProps extends DatePickerProps {
  children: React.ReactNode;
}

const Tempo = createContext<ObservableObject<TempoState>>(observable<TempoState>());

export const useTempoState = () => useContext(Tempo);

const Updater = ({ children, ...props }: UpdaterProps) => {
  useNotifyUpdates(props);

  return children;
};

export const DatePicker = (props: DatePickerProps) => {
  const state$ = useObservable<TempoState>({ date: defaultDate(), mode: Mode.DAY });

  return (
    <Tempo.Provider value={state$}>
      <Updater {...props}>
        <Panel />
      </Updater>
    </Tempo.Provider>
  );
};

const Panel = observer(() => {
  const state$ = useTempoState();

  return (
    <div className={styles["tempo-panel"]} dir="rtl">
      <div className={styles["tempo-panel-header"]}>
        <Header />
      </div>
      <Switch value={state$.mode.get()}>
        {{
          [Mode.DAY]: () => <Days />,
          [Mode.MONTH]: () => <Months />,
          [Mode.YEAR]: () => <h1>year panel</h1>,
          default: () => null,
        }}
      </Switch>
    </div>
  );
});
