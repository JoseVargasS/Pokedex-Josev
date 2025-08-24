import s from "./Profile.module.css";
import { Form } from "react-router-dom";
import NavBar from "../NavBar";

function Profile() {
  return (
    <>
      <h1 className={s.title}>Profile</h1>
      <div className={s.profileForm}>
        <Form method="post" action="">
          <label>
            <p>Email</p>
            <input name="username" />
          </label>
          <label>
            <p>Password</p>
            <input name="password" type="password" />
          </label>
          <label>
            <p>First Name</p>
            <input name="firstname" />
          </label>
          <label>
            <p>Last Name</p>
            <input name="lastname" />
          </label>
          <button type="submit">Create Account</button>
        </Form>
      </div>
      <NavBar />
    </>
  );
}

export default Profile;
