import { usePersistedObservable } from "@legendapp/state/react-hooks/usePersistedObservable";
import { DatePickerProps } from "./picker.types";
import { StateObject } from "@/types";
import { init } from "./init";
import { StateProvider } from "@/core/provider";
import { Updater } from "./updater";
import { Panel } from "../panel";

export const DatePicker = (props: DatePickerProps) => {
  const { persistOptions, ...internalProps } = props;

  const state$ = usePersistedObservable<StateObject>(...init(persistOptions));

  return (
    <StateProvider value={state$}>
      <Updater {...internalProps}>
        <Panel />
      </Updater>
    </StateProvider>
  );
};
