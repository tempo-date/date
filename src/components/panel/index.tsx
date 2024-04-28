import styles from "./panel.module.scss";
import { Switch, observer, useMountOnce, useObservable, useWhenReady } from "@legendapp/state/react";
import { DatePickerProps, Mode, PersistenceOptions, TempoDate } from "@/types";
import { Days } from "../day";
import { useNotifyUpdates } from "@/core/hooks";
import { Header } from "../header";
import { Months } from "../month";
import { defaultDate } from "@/core/date";
import { createContext, useContext } from "react";
import { ObservableObject, PersistOptions, observable } from "@legendapp/state";
import { ObservablePersistLocalStorage, ObservablePersistSessionStorage } from "@legendapp/state/persist-plugins/local-storage";
import "@/core/configs";
import { usePersistedObservable } from "@legendapp/state/react-hooks/usePersistedObservable";

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

const setOptions = (options?: PersistenceOptions): PersistOptions<TempoState> => {
  if (!options) {
    // TODO should remove prior stored state from storage.
    return {};
  }

  const { name, strategy = "local-storage" } = options;

  return {
    local: {
      name,
      readonly: !name,
    },
    pluginLocal: strategy === "session-storage" ? ObservablePersistSessionStorage : ObservablePersistLocalStorage,
  };
};

const init = (options?: PersistenceOptions): [TempoState, PersistOptions<TempoState>] => {
  return [{ date: defaultDate(), mode: Mode.DAY }, setOptions(options)];
};

export const DatePicker = ({ persistOptions, ...props }: DatePickerProps) => {
  const state$ = usePersistedObservable<TempoState>(...init(persistOptions));

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
