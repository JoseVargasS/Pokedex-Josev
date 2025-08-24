import { createBrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import PokeSearch from "./components/PokeSearch";
import Profile from "./components/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "create-account",
    element: <CreateAccount />,
  },
  {
    path: "pokesearch",
    element: <PokeSearch />,
  },
  {
    path: "profile",
    element: <Profile />,
  },
]);
