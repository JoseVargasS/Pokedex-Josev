import { Form, Link, useNavigation } from "react-router-dom";
import s from "./CreateAccount.module.css";
import { HashLoader } from "react-spinners";

function CreateAccount() {
  const navigation = useNavigation();

  return (
    <>
      <h1 className={s.title}>Welcome to Poke Collection</h1>
      <div className={s.createAccountForm}>
        <Form method="post" replace>
          <label>
            <p>Email</p>
            <input name="email" placeholder="example@mail.com" />
          </label>
          <label>
            <p>Password</p>
            <input name="password" type="password" placeholder="*******" />
          </label>
          <label>
            <p>First Name</p>
            <input name="first_name" placeholder="Dina" />
          </label>
          <label>
            <p>Last Name</p>
            <input name="last_name" placeholder="Boluarte" />
          </label>

          {navigation.state === "submitting" ? (
            <HashLoader />
          ) : (
            <button type="submit">Create Account</button>
          )}
        </Form>
        <Link to="/">
          <h3>Login</h3>
        </Link>
      </div>
    </>
  );
}

export default CreateAccount;
