import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import moment from "moment-jalaali";
// import fa from "moment/src/locale/fa";
// moment.locale("fa", fa);
moment.loadPersian();

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
