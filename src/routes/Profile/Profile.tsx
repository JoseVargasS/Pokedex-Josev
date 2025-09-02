import s from "./Profile.module.css";
import { Form, useNavigation } from "react-router-dom";
import NavBar from "../NavBar";
import { useContext, type ChangeEvent } from "react";
import { HashLoader } from "react-spinners";
import { useProfile } from "../../hooks/useProfile";
import { TranslateContext } from "../../contexts/Translate";
import { t } from "../../translate";
import Translate from "../Translate";
import Logout from "../Logout";

function Profile() {
  const navigation = useNavigation();
  const { profileData, setProfileData, password, setPassword } = useProfile();
  const { lang } = useContext(TranslateContext);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <>
      <Translate />

      <Logout />

      <h1 className={s.title}>{t[lang].profile}</h1>

      <div className={s.profileForm}>
        <Form method="post" action="/profile">
          <label>
            <p>{t[lang].email}</p>
            <input
              name="email"
              value={profileData.email}
              onChange={handleInputChange}
            />
          </label>
          <label>
            <p>{`${t[lang].password} (${t[lang].blank})`}</p>
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label>
            <p>{t[lang].firstName}</p>
            <input
              name="first_name"
              value={profileData.first_name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            <p>{t[lang].lastName}</p>
            <input
              name="last_name"
              value={profileData.last_name}
              onChange={handleInputChange}
            />
          </label>

          {navigation.state === "submitting" ? (
            <HashLoader />
          ) : (
            <button type="submit">{t[lang].update}</button>
          )}
        </Form>
      </div>
      <NavBar />
    </>
  );
}

export default Profile;
