import s from "./Favorites.module.css";
import { useFavorites } from "../../hooks/useFavorites";
import NavBar from "../NavBar";
import { useFetcher } from "react-router-dom";
import { useSearch } from "../../hooks/useSearch";
import { useState } from "react";

function Favorites() {
  const Fetcher = useFetcher();
  const { typeColors } = useSearch();
  const { pokemonFavs, deleteFavById } = useFavorites();
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  return (
    <>
      <Fetcher.Form method="post" action="/logout">
        <button className={s.logout}>Logout</button>
      </Fetcher.Form>

      <h1 className={s.title}>Favorites</h1>
      <ul className={s.favorites}>
        {pokemonFavs.map((fav) => {
          const backColor = typeColors[fav.pokemon_type];
          const pokemon_Id =
            Number(fav.pokemon_id) < 1000
              ? `#${fav.pokemon_id.toString().padStart(3, "0")}`
              : `#${fav.pokemon_id}`;

          return (
            <li
              key={fav.pokemon_id}
              style={{ border: `solid 1px ${backColor}` }}
            >
              <div>
                <button
                  onClick={() => deleteFavById(Number(fav.pokemon_id))}
                  onMouseEnter={() => setHoveredItem(Number(fav.pokemon_id))}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {hoveredItem === Number(fav.pokemon_id) ? (
                    <h5>❌</h5>
                  ) : (
                    <img src="src/images/fav-on.svg" className={s.starImg} />
                  )}
                </button>
                <p style={{ color: backColor }}>{pokemon_Id}</p>
              </div>
              <img
                src={fav.pokemon_avatar_url}
                alt={fav.pokemon_name}
                className={s.favImg}
              />
              <span style={{ backgroundColor: backColor }}>
                {fav.pokemon_name}
              </span>
            </li>
          );
        })}
      </ul>
      <NavBar />
    </>
  );
}

export default Favorites;
