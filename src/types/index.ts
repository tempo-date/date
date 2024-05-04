import { DateInstance } from "@/utils";
import { ReactElement, ReactNode } from "react";

export type Tuple<T extends number, A extends any[] = []> = A["length"] extends T ? A : Tuple<T, [...A, number]>;

export type Nullable<T> = T | null;

interface DateInternalProps {
  _current?: boolean;
  _weekend?: boolean;
  _decadeStart?: number;
  _m?: number;
  _y?: number;
}

// TODO: implements date metadata
export interface DateMetadata {
  isWeekend: boolean;
  isLeapYear: boolean;
  monthName: string;
}
export interface DateInfo {
  day: number;
  month: number;
  year: number;
}

export interface DateObject extends DateInternalProps, DateInfo {}

export interface StateObject {
  readonly _internal_id: string;
  mode: Mode;
  date: Nullable<DateObject>;
}

export type MonthObject = {
  name: string;
  year: number;
  month: number;
};

export type YearObject = {
  year: number;
  _current?: boolean;
};

export enum Mode {
  DAY = "Day",
  MONTH = "Month",
  YEAR = "Year",
}

type CallbackEvents = {
  onChange?(date: DateInfo): void;
  onDayChange?(value: number): void;
  onMonthChange?(value: number): void;
  onYearChange?(value: number): void;
};

export type PersistenceOptions = {
  name: string;
  strategy?: "local-storage" | "session-storage";
};

export type DayAttributes = {
  isCurrent: boolean;
  isDisabled: boolean;
  isActive: boolean;
  isWeekend: boolean;
  select(event?: React.MouseEvent): void;
};

export interface DayRendererProps {
  children: (attributes: DayAttributes) => ReactNode;
}

export interface MonthRendererProps {}

export interface YearRendererProps {}

type RenderComponentProps = DayRendererProps;

export type CustomRenderer = ReactElement<RenderComponentProps> | Array<ReactElement<RenderComponentProps>>;

export interface InternalPickerProps extends CallbackEvents {
  broadcastTag?: string;
  children?: CustomRenderer;
}

export type DisabledDates = Array<DateInfo> | ((instance: DateInstance) => boolean);
