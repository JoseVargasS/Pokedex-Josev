import s from "./Profile.module.css";
import { Form, useFetcher, useNavigation } from "react-router-dom";
import NavBar from "../NavBar";
import type { ChangeEvent } from "react";
import { HashLoader } from "react-spinners";
import { useProfile } from "../../hooks/useProfile";

function Profile() {
  const Fetcher = useFetcher();
  const navigation = useNavigation();
  const { profileData, setProfileData, password, setPassword } = useProfile();

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
