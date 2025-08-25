import { redirect } from "react-router-dom";
import { authProvider } from "../../auth";

export function loader() {
  if (!authProvider.isAuthenticated) return redirect("/");
}
