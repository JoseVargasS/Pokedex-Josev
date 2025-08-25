import { Form, Link } from "react-router-dom";
import s from "./CreateAccount.module.css";

function CreateAccount() {
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
          <button type="submit">Create Account</button>
        </Form>
        <Link to="/">
          <h3>Login</h3>
        </Link>
      </div>
    </>
  );
}

export default CreateAccount;
