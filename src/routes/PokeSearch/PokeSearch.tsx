import s from "./PokeSearch.module.css";
import NavBar from "../NavBar";
import { HashLoader } from "react-spinners";
import { useSearch } from "../../hooks/useSearch";
import { useFavorites } from "../../hooks/useFavorites";
import { useContext, type FormEvent } from "react";
import { TranslateContext } from "../../contexts/Translate";
import { t } from "../../translate";
import Translate from "../Translate";
import Logout from "../Logout";

function PokeSearch() {
  const { lang } = useContext(TranslateContext);

  const {
    pokemon,
    setPokemon,
    handleSearch,
    pokemonData,
    imageUrl,
    typeColors,
    errorSearch,
    loading,
  } = useSearch();
  const { isFavorite, toggleFavorite } = useFavorites(pokemonData!, imageUrl);

  const src = isFavorite ? "src/images/fav-on.svg" : "src/images/fav-off.svg";
  const alt = isFavorite ? "favorite" : "no-favorite";
  const buttonName = isFavorite ? t[lang].delFav : t[lang].addfav;

  const errorMessage = errorSearch && pokemon !== "" && (
    <p className={s.error}>{errorSearch}</p>
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleSearch(pokemon);
  }

  return (
    <>
      <Translate />

      <Logout />

      <div className={s.search}>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              name="search"
              placeholder={t[lang].phldSearch}
              value={pokemon}
              onChange={(e) => setPokemon(e.target.value)}
            />
          </label>
          <button type="submit">{t[lang].search}</button>
        </form>

        {errorMessage}

        {loading ? (
          <HashLoader size={100} className={s.spinner} />
        ) : (
          pokemonData && (
            <>
              <div className={s.cardTitle}>
                <h1>{pokemonData.name}</h1>
                <h3>
                  {pokemonData!.id < 1000
                    ? `#${pokemonData!.id.toString().padStart(3, "0")}`
                    : `#${pokemonData!.id}`}
                </h3>
              </div>

              <img
                src={imageUrl}
                alt={pokemonData.name}
                className={s.imgSearch}
              />

              <div className={s.cardLabel}>
                {pokemonData?.types.map((t) => {
                  const backColor: string = typeColors[t.type.name];
                  return (
                    <span
                      key={t.type.name}
                      style={{ backgroundColor: backColor }}
                    >
                      {t.type.name}
                    </span>
                  );
                })}
              </div>

              <div className={s.cardChar}>
                <div>
                  <div>
                    <img src="src/images/weight.svg" alt="weight" />
                    <span>{(pokemonData.weight / 10).toFixed(1)} kg</span>
                  </div>
                  <h4>{t[lang].weight}</h4>
                </div>
                <hr />
                <div>
                  <div>
                    <img src="src/images/height.svg" alt="height" />
                    <span>{(pokemonData.height / 10).toFixed(1)} m</span>
                  </div>
                  <h4>{t[lang].height}</h4>
                </div>
              </div>

              <button onClick={toggleFavorite} className={s.buttonFav}>
                <img src={src} alt={alt} />
                <span>{buttonName}</span>
              </button>
            </>
          )
        )}

        {pokemon === "" && !pokemonData && (
          <div className={s.default}>
            <img src="src/images/unknow-poke.png" alt="unknow pokemon" />
            <h3>{t[lang].noSearch}</h3>
          </div>
        )}
      </div>

      <NavBar />
    </>
  );
}

export default PokeSearch;
