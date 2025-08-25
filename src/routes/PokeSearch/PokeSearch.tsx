import s from "./PokeSearch.module.css";
import { Form, useFetcher } from "react-router-dom";
import NavBar from "../NavBar";

function PokeSearch() {
  const Fetcher = useFetcher();
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
        <img src="src/images/unknow-poke.png" alt="unknow pokemon" />
        <h3>Ready to search</h3>
      </div>
      <NavBar />
    </>
  );
}

export default PokeSearch;
