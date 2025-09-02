import { Form, Link, useNavigation } from "react-router-dom";
import s from "./CreateAccount.module.css";
import { HashLoader } from "react-spinners";
import Translate from "../Translate";
import { t } from "../../translate";
import { useContext } from "react";
import { TranslateContext } from "../../contexts/Translate";

function CreateAccount() {
  const navigation = useNavigation();
  const { lang } = useContext(TranslateContext);

  return (
    <>
      <Translate />
      <h1 className={s.title}>{t[lang].cAccTitle}</h1>
      <div className={s.createAccountForm}>
        <Form method="post" replace>
          <label>
            <p>{t[lang].email}</p>
            <input name="email" placeholder="example@mail.com" />
          </label>
          <label>
            <p>{t[lang].password}</p>
            <input name="password" type="password" placeholder="******" />
          </label>
          <label>
            <p>{t[lang].firstName}</p>
            <input name="first_name" placeholder="Dina" />
          </label>
          <label>
            <p>{t[lang].lastName}</p>
            <input name="last_name" placeholder="Boluarte" />
          </label>

          {navigation.state === "submitting" ? (
            <HashLoader />
          ) : (
            <button type="submit">{t[lang].cAcc}</button>
          )}
        </Form>
        <Link to="/">
          <h3>{t[lang].login}</h3>
        </Link>
      </div>
    </>
  );
}

export default CreateAccount;
