import { DatePicker } from "./components/picker";
import "./main.scss";

function App() {
  // console.log({ before: isBefore() });

  return (
    <div style={{ padding: 64 }}>
      <DatePicker disabledDates={(date) => date.isSameOrBefore({ year: 1403, month: 2, day: 10 })} />
    </div>
  );
}

export default App;
