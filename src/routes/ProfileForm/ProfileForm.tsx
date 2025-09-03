import s from "./ProfileForm.module.css";
import { Form, useNavigation } from "react-router-dom";
import ProfileLabel from "../ProfileLabel";
import { useContext, type ChangeEvent } from "react";
import { TranslateContext } from "../../contexts/Translate";
import { t } from "../../translate";
import { useProfile } from "../../hooks/useProfile";
import { HashLoader } from "react-spinners";

function ProfileForm() {
  const navigation = useNavigation();
  const { lang } = useContext(TranslateContext);
  const { profileData, setProfileData, password, setPassword } = useProfile();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  return (
    <Form method="post" action="/profile" className={s.profileForm}>
      <ProfileLabel
        label={t[lang].email}
        name="email"
        value={profileData.email}
        onChange={handleInputChange}
      />
      <ProfileLabel
        label={`${t[lang].password} (${t[lang].blank})`}
        name="password"
        type="password"
        value={password}
        onChange={handlePassword}
      />
      <ProfileLabel
        label={t[lang].firstName}
        name="first_name"
        value={profileData.first_name}
        onChange={handleInputChange}
      />
      <ProfileLabel
        label={t[lang].lastName}
        name="last_name"
        value={profileData.last_name}
        onChange={handleInputChange}
      />

      {navigation.state === "submitting" ? (
        <HashLoader />
      ) : (
        <button type="submit">{t[lang].update}</button>
      )}
    </Form>
  );
}

export default ProfileForm;
