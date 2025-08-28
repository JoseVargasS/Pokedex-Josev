import s from "./PokeSearch.module.css";
import { useFetcher } from "react-router-dom";
import NavBar from "../NavBar";
import { HashLoader } from "react-spinners";
import { useSearch } from "../../hooks/useSearch";
import { useFavorites } from "../../hooks/useFavorites";
import type { FormEvent } from "react";

function PokeSearch() {
  const Fetcher = useFetcher();

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
  const buttonName = isFavorite ? "Remove Favorite" : "Mark as Favorite";

  const errorMessage = errorSearch && pokemon !== "" && (
    <p className={s.error}>{errorSearch}</p>
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleSearch(pokemon);
  }

  return (
    <>
      <Fetcher.Form method="post" action="/logout">
        <button className={s.logout}>Logout</button>
      </Fetcher.Form>

      <div className={s.search}>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              name="search"
              placeholder="pokemon name"
              value={pokemon}
              onChange={(e) => setPokemon(e.target.value)}
            />
          </label>
          <button type="submit">Search</button>
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
                  <h4>Weight</h4>
                </div>
                <hr />
                <div>
                  <div>
                    <img src="src/images/height.svg" alt="height" />
                    <span>{(pokemonData.height / 10).toFixed(1)} m</span>
                  </div>
                  <h4>Height</h4>
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
            <h3>Ready to search</h3>
          </div>
        )}
      </div>

      <NavBar />
    </>
  );
}

export default PokeSearch;
