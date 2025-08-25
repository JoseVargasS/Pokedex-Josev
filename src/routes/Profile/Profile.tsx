import s from "./Profile.module.css";
import { Form, useFetcher, useNavigation } from "react-router-dom";
import NavBar from "../NavBar";
import { useEffect, useState, type ChangeEvent } from "react";
import { authProvider, BASE_URL } from "../../auth";
import { HashLoader } from "react-spinners";

interface ProfileData {
  email: string;
  first_name: string;
  last_name: string;
}

function Profile() {
  const Fetcher = useFetcher();
  const navigation = useNavigation();
  console.log(navigation.state);

  const [profileData, setProfileData] = useState<ProfileData>({
    email: "",
    first_name: "",
    last_name: "",
  });
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    const url = `${BASE_URL}/profile`;
    const options: RequestInit = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authProvider.token}`,
      },
    };

    fetch(url, options)
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener el perfil");
        return res.json();
      })
      .then((data: ProfileData) => {
        setProfileData(data);
        sessionStorage.setItem("original_profile_data", JSON.stringify(data));
      });
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <>
      <Fetcher.Form method="post" action="/logout">
        <button className={s.logout}>Logout</button>
      </Fetcher.Form>

      <h1 className={s.title}>Profile</h1>

      <div className={s.profileForm}>
        <Form method="post" action="/profile">
          <label>
            <p>Email</p>
            <input
              name="email"
              value={profileData.email}
              onChange={handleInputChange}
            />
          </label>
          <label>
            <p>Password (dejar vacío para no cambiar)</p>
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label>
            <p>First Name</p>
            <input
              name="first_name"
              value={profileData.first_name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            <p>Last Name</p>
            <input
              name="last_name"
              value={profileData.last_name}
              onChange={handleInputChange}
            />
          </label>

          {navigation.state === "submitting" ? (
            <HashLoader />
          ) : (
            <button type="submit">Update</button>
          )}
        </Form>
      </div>
      <NavBar />
    </>
  );
}

export default Profile;
