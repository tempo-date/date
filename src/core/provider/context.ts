import { StateObject } from "@/types";
import { ObservableObject, observable } from "@legendapp/state";
import { createContext } from "react";

const StateContext = createContext<ObservableObject<StateObject>>(observable<StateObject>());

export { StateContext };
