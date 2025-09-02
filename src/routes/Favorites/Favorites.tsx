import s from "./Favorites.module.css";
import { useFavorites } from "../../hooks/useFavorites";
import NavBar from "../NavBar";
import { useSearch } from "../../hooks/useSearch";
import { useContext, useState } from "react";
import Translate from "../Translate";
import { TranslateContext } from "../../contexts/Translate";
import { t } from "../../translate";
import Logout from "../Logout";

function Favorites() {
  const { typeColors } = useSearch();
  const { pokemonFavs, deleteFavById } = useFavorites();
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const { lang } = useContext(TranslateContext);

  return (
    <>
      <Translate />

      <Logout />

      <h1 className={s.title}>{t[lang].fav}</h1>
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
