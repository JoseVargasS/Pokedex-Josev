import { useEffect, useState } from "react";
import { authProvider, BASE_URL } from "../auth";

interface ProfileData {
  email: string;
  first_name: string;
  last_name: string;
}

export function useProfile() {
  const [profileData, setProfileData] = useState<ProfileData>({
    email: "",
    first_name: "",
    last_name: "",
  });
  const [password, setPassword] = useState<string>("");

  async function getProfileData() {
    const url = `${BASE_URL}/profile`;

    const options: RequestInit = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authProvider.token}`,
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error("Error al obtener el perfil");
      const data = await response.json();
      setProfileData(data);
      sessionStorage.setItem("original_profile_data", JSON.stringify(data));
    } catch (error) {
      return { error: (error as Error).message };
    }
  }

  useEffect(() => {
    getProfileData();
  }, []);

  return { profileData, setProfileData, password, setPassword };
}
