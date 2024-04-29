import { getDefaultDate } from "@/core";
import { Mode, PersistenceOptions, StateObject } from "@/types";
import { PersistOptions } from "@legendapp/state";
import { ObservablePersistLocalStorage as LS, ObservablePersistSessionStorage as SS } from "@legendapp/state/persist-plugins/local-storage";

const setOptions = (options?: PersistenceOptions): PersistOptions<StateObject> => {
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
    pluginLocal: strategy === "local-storage" ? LS : SS,
  };
};

export const init = (options?: PersistenceOptions): [StateObject, PersistOptions<StateObject>] => {
  return [{ date: getDefaultDate(), mode: Mode.DAY }, setOptions(options)];
};
