export type Tuple<T extends number, A extends any[] = []> = A["length"] extends T ? A : Tuple<T, [...A, number]>;

export type Nullable<T> = T | null;

interface DateInternalProps {
  _current?: boolean;
  _weekend?: boolean;
  __m?: number;
  __y?: number;
}

export interface DateInfo {
  day: number;
  month: number;
  year: number;
}

export interface DateObject extends DateInternalProps, DateInfo {}

export interface StateObject {
  mode: Mode;
  date: Nullable<DateObject>;
}

export type MonthObject = {
  name: string;
  year: number;
  month: number;
};

export enum Mode {
  DAY = "Day",
  MONTH = "Month",
  YEAR = "Year",
}

type CallbackEvents = {
  [event in `on${Mode}Change`]?: (value: number) => void;
};

export type PersistenceOptions = {
  name: string;
  strategy?: "local-storage" | "session-storage";
};

export interface InternalPickerProps extends CallbackEvents {
  onChange?(date: DateInfo): void;
  broadcastTag?: string;
}
