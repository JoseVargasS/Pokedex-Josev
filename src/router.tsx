import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "./routes/Login";
import CreateAccount from "./routes/CreateAccount";
import PokeSearch from "./routes/PokeSearch";
import Profile from "./routes/Profile";
import { action as loginAction } from "./routes/Login/action";
import { action as createAccountAction } from "./routes/CreateAccount/action";
import { loader as createAccountLoader } from "./routes/CreateAccount/loader";
import { loader as loginLoader } from "./routes/Login/loader";
import { loader as pokeSearchLoader } from "./routes/PokeSearch/loader";
import { loader as profileLoader } from "./routes/Profile/loader";
import { authProvider } from "./auth";
import { action as profileAction } from "./routes/Profile/action";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    loader: loginLoader,
    action: loginAction,
  },
  {
    path: "create-account",
    element: <CreateAccount />,
    loader: createAccountLoader,
    action: createAccountAction,
  },
  {
    path: "pokesearch",
    element: <PokeSearch />,
    loader: pokeSearchLoader,
  },
  {
    path: "profile",
    element: <Profile />,
    loader: profileLoader,
    action: profileAction,
  },
  {
    path: "logout",
    action: () => {
      authProvider.logout();
      return redirect("/");
    },
  },
]);
