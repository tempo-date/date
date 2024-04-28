import { DatePicker } from "./components/panel";
import "./main.scss";

function App() {
  return (
    <div style={{ padding: 64 }}>
      <DatePicker
        onChange={(date) => console.log("date", date)}
        onDayChange={(day) => console.log("day", day)}
        onMonthChange={(month) => console.log("month", month)}
        persistOptions={{ name: "test", strategy: "local-storage" }}
      />
    </div>
  );
}

export default App;
