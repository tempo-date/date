import { useContext } from "react";
import { StateContext } from "./context";

export const useConsumeState = () => useContext(StateContext);
