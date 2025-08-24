import { Form, useNavigate } from "react-router-dom";
import s from "./CreateAccount.module.css";

function CreateAccount() {
  const navigate = useNavigate();

  return (
    <>
      <h1 className={s.title}>Welcome to Poke Collection</h1>
      <div className={s.createAccountForm}>
        <Form method="post" action="">
          <label>
            <p>Email</p>
            <input name="username" placeholder="example@mail.com" />
          </label>
          <label>
            <p>Password</p>
            <input name="password" type="password" placeholder="*******" />
          </label>
          <label>
            <p>First Name</p>
            <input name="firstname" placeholder="Dina" />
          </label>
          <label>
            <p>Last Name</p>
            <input name="lastname" placeholder="Boluarte" />
          </label>
          <button type="submit">Create Account</button>
        </Form>
        <h3 onClick={() => navigate("/")}>Login</h3>
      </div>
    </>
  );
}

export default CreateAccount;
