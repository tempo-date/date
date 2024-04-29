import { StateObject } from "@/types";
import { ObservableObject } from "@legendapp/state";
import { StateContext } from "./context";

interface StateProviderProps {
  children: React.ReactNode;
  value: ObservableObject<StateObject>;
}

export const StateProvider = ({ children, value }: StateProviderProps) => {
  return <StateContext.Provider value={value}>{children}</StateContext.Provider>;
};
