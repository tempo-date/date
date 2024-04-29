import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import moment from "moment-jalaali";

moment.loadPersian();

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
