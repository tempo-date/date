import { batch } from "@legendapp/state";
import { DECADE, FIRST_MONTH, LAST_MONTH } from "../constants/internals";
import { useConsumeState } from "../provider/hook";

export const useNavigation = () => {
  const state$ = useConsumeState();

  const onNextMonth = () => {
    const currentMonth = state$.date.month.peek();

    if (currentMonth === LAST_MONTH) {
      return batch(() => {
        state$.date.month.set(FIRST_MONTH);
        state$.date.year.set((previous) => previous + 1);
      });
    }

    state$.date.month.set((previous) => previous + 1);
  };

  const onPreviousMonth = () => {
    const currentMonth = state$.date.month.peek();

    if (currentMonth === FIRST_MONTH) {
      return batch(() => {
        state$.date.month.set(LAST_MONTH);
        state$.date.year.set((previous) => previous - 1);
      });
    }

    state$.date.month.set((previous) => previous - 1);
  };

  // TODO lower/upper bounds limitation 0 to 9999
  const onNextYear = () => {
    state$.date.year.set((previous) => previous + 1);
  };

  // TODO lower/upper bounds limitation 0 to 9999
  const onPreviousYear = () => {
    state$.date.year.set((previous) => previous - 1);
  };

  // TODO lower/upper bounds limitation 0 to 9999
  const onNextDecade = () => {
    state$.date._decadeStart.set((previous) => previous + DECADE);
  };

  // TODO lower/upper bounds limitation 0 to 9999
  const onPreviousDecade = () => {
    state$.date._decadeStart.set((previous) => previous - DECADE);
  };

  return { onNextMonth, onNextYear, onPreviousMonth, onPreviousYear, onNextDecade, onPreviousDecade };
};
