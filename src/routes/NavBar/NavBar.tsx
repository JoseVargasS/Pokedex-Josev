import s from "./NavBar.module.css";

import { Link, useLocation } from "react-router-dom";

function NavBar() {
  const { pathname } = useLocation();

  const path = (() => {
    switch (true) {
      case pathname === "/profile":
        return "src/images/profile-in.svg";
      case pathname === "/pokesearch":
        return "src/images/search-in.svg";
      case pathname === "/favorites":
        return "src/images/fav-in.svg";
    }
  })();

  return (
    <section className={s.navBar}>
      <div>
        <Link to="/profile">
          <img
            src={
              pathname === "/pokesearch" || pathname === "/favorites"
                ? "src/images/profile-out.svg"
                : path
            }
            alt="profile"
          />
        </Link>
        <Link to="/pokesearch">
          <img
            src={
              pathname === "/profile" || pathname === "/favorites"
                ? "src/images/search-out.svg"
                : path
            }
            alt="search pokemon"
          />
        </Link>
        <Link to="/favorites">
          <img
            src={
              pathname === "/profile" || pathname === "/pokesearch"
                ? "src/images/fav-out.svg"
                : path
            }
            alt="favorites"
          />
        </Link>
      </div>
    </section>
  );
}

export default NavBar;
