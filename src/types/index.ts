export type Tuple<T extends number, A extends any[] = []> = A["length"] extends T ? A : Tuple<T, [...A, number]>;

export interface StructDate {
  year: number;
  month: number;
  day: number;
}

export interface StructDatetime extends StructDate {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface IndexedValue {
  id: number;
  name: string;
}

interface DateInternalProps {
  _current?: boolean;
  _weekend?: boolean;
  __m?: number;
  __y?: number;
}

export interface TempoDate extends DateInternalProps {
  year: number;
  month: number;
  day: number | null;
}

export enum Mode {
  DAY = "Day",
  MONTH = "Month",
  YEAR = "Year",
}

type TempoEvents = {
  [event in `on${Mode}Change`]?: (value: number) => void;
};

export type PersistenceOptions = {
  name: string;
  strategy?: "local-storage" | "session-storage";
};
export interface DatePickerProps extends TempoEvents {
  onChange?(date: TempoDate): void;
  syncIdentifier?: string;
  persistOptions?: PersistenceOptions;
}

export type MonthStruct = {
  name: string;
  year: number;
  month: number;
};
