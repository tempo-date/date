import { useNotifyUpdates } from "@/core/hooks";
import { DatePickerProps } from "../picker.types";

interface UpdaterProps extends DatePickerProps {
  children: React.ReactNode;
}

export const Updater = ({ children, ...props }: UpdaterProps) => {
  useNotifyUpdates(props);

  return children;
};
