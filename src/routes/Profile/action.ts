import type { ActionFunctionArgs } from "react-router-dom";
import { authProvider } from "../../auth";

export async function action({ request }: ActionFunctionArgs) {
  //trae datos de form con action="/profile"
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const first_name = formData.get("first_name") as string;
  const last_name = formData.get("last_name") as string;
  const password = formData.get("password") as string;

  //obitne datos originales del perfil (antes de editar)
  const originalProfileData = sessionStorage.getItem("original_profile_data");
  const originalData = originalProfileData
    ? JSON.parse(originalProfileData)
    : {};

  //crea objeto con solo los campos que han cambiado
  const updateData: Partial<{
    email: string;
    first_name: string;
    last_name: string;
    password: string;
  }> = {};

  if (email !== originalData.email) updateData.email = email;
  if (first_name !== originalData.first_name)
    updateData.first_name = first_name;
  if (last_name !== originalData.last_name) updateData.last_name = last_name;
  if (password) updateData.password = password;

  try {
    await authProvider.updateProfile(updateData);
  } catch (error) {
    return { error: (error as Error).message };
  }
}
