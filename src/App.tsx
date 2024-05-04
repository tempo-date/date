import { DatePicker } from "./components/picker";
import DayRenderer from "./customs/day";
import "./main.scss";

function App() {
  // console.log({ before: isBefore() });

  return (
    <div style={{ padding: 64 }}>
      <DatePicker>
        <DayRenderer>{({ isCurrent }) => <h1 style={{ color: isCurrent ? "red" : "blue" }}>gholi</h1>}</DayRenderer>
      </DatePicker>
    </div>
  );
}

export default App;
