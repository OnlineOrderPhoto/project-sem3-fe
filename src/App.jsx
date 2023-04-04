import { Route, Routes } from "react-router-dom";
import { path } from "./constants/path";
import LoginPage from "./pages/LoginPage/LoginPage";
import useRouteElement from "./routes/useRouteELement";

function App() {
  const routes = useRouteElement();
  return <>{routes}</>;
}

export default App;
