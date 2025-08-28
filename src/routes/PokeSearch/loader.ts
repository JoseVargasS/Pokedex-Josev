import { redirect } from "react-router-dom";
import { authProvider } from "../../auth";

export async function loader() {
  if (!authProvider.isAuthenticated) return redirect("/");
}
