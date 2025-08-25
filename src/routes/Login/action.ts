import { redirect, type ActionFunctionArgs } from "react-router-dom";
import { authProvider } from "../../auth";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await authProvider.login(email, password);
  } catch (error) {
    return { error: (error as Error).message };
  }

  return redirect("/pokesearch");
}
