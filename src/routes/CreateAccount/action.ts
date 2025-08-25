import { redirect, type ActionFunctionArgs } from "react-router-dom";
import { authProvider } from "../../auth";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const first_name = formData.get("first_name") as string;
  const last_name = formData.get("last_name") as string;

  try {
    await authProvider.createAccount(email, first_name, last_name, password);
  } catch (error) {
    return { error: (error as Error).message };
  }

  return redirect("/pokesearch");
}
