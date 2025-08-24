import { Form, useNavigate } from "react-router-dom";
import s from "./Login.module.css";

function Login() {
  const navigate = useNavigate();

  return (
    <>
      <h1 className={s.title}>Welcome to Poke Collection</h1>
      <div className={s.loginForm}>
        <Form method="post" action="">
          <label>
            <p>Email</p>
            <input name="username" placeholder="example@mail.com" />
          </label>
          <label>
            <p>Password</p>
            <input name="password" type="password" placeholder="*******" />
          </label>
          <button type="submit">Login</button>
        </Form>
        <h3 onClick={() => navigate("/create-account")}>Create Account</h3>
      </div>
    </>
  );
}

export default Login;
