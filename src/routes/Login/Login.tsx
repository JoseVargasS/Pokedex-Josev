import { Form, Link, useNavigation } from "react-router-dom";
import s from "./Login.module.css";
import { HashLoader } from "react-spinners";

function Login() {
  const navigation = useNavigation();

  return (
    <>
      <h1 className={s.title}>Welcome to Poke Collection</h1>
      <div className={s.loginForm}>
        <Form method="post" replace>
          <label>
            <p>Email</p>
            <input name="email" placeholder="example@mail.com" />
          </label>
          <label>
            <p>Password</p>
            <input name="password" type="password" placeholder="*******" />
          </label>

          {navigation.state === "submitting" ? (
            <HashLoader />
          ) : (
            <button type="submit">Login</button>
          )}
        </Form>
        <Link to="/create-account">
          <h3>Create Account</h3>
        </Link>
      </div>
    </>
  );
}

export default Login;
