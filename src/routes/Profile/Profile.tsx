import s from "./Profile.module.css";
import NavBar from "../NavBar";
import { useContext } from "react";
import { TranslateContext } from "../../contexts/Translate";
import { t } from "../../translate";
import Translate from "../Translate";
import Logout from "../Logout";
import ProfileForm from "../ProfileForm";

function Profile() {
  const { lang } = useContext(TranslateContext);

  return (
    <>
      <Translate />

      <Logout />

      <h1 className={s.title}>{t[lang].profile}</h1>

      <ProfileForm />

      <NavBar />
    </>
  );
}

export default Profile;
