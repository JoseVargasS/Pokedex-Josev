import { Form, Link, useNavigation } from "react-router-dom";
import s from "./Login.module.css";
import { HashLoader } from "react-spinners";
import { useContext } from "react";
import { TranslateContext } from "../../contexts/Translate";
import Translate from "../Translate";
import { t } from "../../translate";

function Login() {
  const navigation = useNavigation();
  const { lang } = useContext(TranslateContext);

  return (
    <>
      <Translate />
      <h1 className={s.title}>{t[lang].cAccTitle}</h1>
      <div className={s.loginForm}>
        <Form method="post" replace>
          <label>
            <p>{t[lang].email}</p>
            <input name="email" placeholder="example@mail.com" />
          </label>
          <label>
            <p>{t[lang].password}</p>
            <input name="password" type="password" placeholder="*******" />
          </label>

          {navigation.state === "submitting" ? (
            <HashLoader />
          ) : (
            <button type="submit">{t[lang].login}</button>
          )}
        </Form>
        <Link to="/create-account">
          <h3>{t[lang].cAcc}</h3>
        </Link>
      </div>
    </>
  );
}

export default Login;
