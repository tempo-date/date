import { configureObservablePersistence } from "@legendapp/state/persist";
import { ObservablePersistLocalStorage, ObservablePersistSessionStorage } from "@legendapp/state/persist-plugins/local-storage";

configureObservablePersistence({
  pluginLocal: ObservablePersistLocalStorage,
});

configureObservablePersistence({
  pluginLocal: ObservablePersistSessionStorage,
});
