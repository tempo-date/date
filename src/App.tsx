import { DatePicker } from "./components/picker";
import "./main.scss";

function App() {
  return (
    <div style={{ padding: 64 }}>
      <DatePicker onChange={(date) => console.log("date", date)} />
    </div>
  );
}

export default App;
