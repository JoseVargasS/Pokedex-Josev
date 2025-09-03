import { Form, useNavigation } from "react-router-dom";
import { t } from "../../translate";
import { useContext } from "react";
import { TranslateContext } from "../../contexts/Translate";
import { HashLoader } from "react-spinners";

function CreateAccountForm() {
  const navigation = useNavigation();
  const { lang } = useContext(TranslateContext);

  return (
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
  );
}

export default CreateAccountForm;
