import { useNotifyUpdates } from "@/core/hooks";
import { DatePickerProps } from "../picker.types";
import { Properties } from "./context";

interface UpdaterProps extends DatePickerProps {
  children: React.ReactNode;
}

export const Updater = ({ children, disabledDates, ...props }: UpdaterProps) => {
  useNotifyUpdates(props);

  return <Properties.Provider value={{ disabledDates }}>{children}</Properties.Provider>;
};
