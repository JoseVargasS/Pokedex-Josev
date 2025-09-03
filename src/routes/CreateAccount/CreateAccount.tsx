import { Link } from "react-router-dom";
import s from "./CreateAccount.module.css";
import Translate from "../Translate";
import { t } from "../../translate";
import { useContext } from "react";
import { TranslateContext } from "../../contexts/Translate";
import CreateAccountForm from "../CreateAccountForm";

function CreateAccount() {
  const { lang } = useContext(TranslateContext);

  return (
    <>
      <Translate />

      <h1 className={s.title}>{t[lang].cAccTitle}</h1>

      <div className={s.createAccountForm}>
        <CreateAccountForm />

        <Link to="/">
          <h3>{t[lang].login}</h3>
        </Link>
      </div>
    </>
  );
}

export default CreateAccount;
