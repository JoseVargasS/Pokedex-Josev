import s from "./PokeSearch.module.css";
import { Form, useFetcher, useNavigation } from "react-router-dom";
import NavBar from "../NavBar";
import { HashLoader } from "react-spinners";

function PokeSearch() {
  const Fetcher = useFetcher();
  const navigation = useNavigation();

  return (
    <>
      <Fetcher.Form method="post" action="/logout">
        <button className={s.logout}>Logout</button>
      </Fetcher.Form>
      <div className={s.search}>
        <Form method="post" action="">
          <label>
            <input name="search" placeholder="pokemon name" />
          </label>
          <button>Search</button>
        </Form>

        {navigation.state === "submitting" ? (
          <HashLoader />
        ) : (
          <>
            <img src="src/images/unknow-poke.png" alt="unknow pokemon" />
            <h3>Ready to search</h3>
          </>
        )}
      </div>
      <NavBar />
    </>
  );
}

export default PokeSearch;
