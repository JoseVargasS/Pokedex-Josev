import s from "./PokeSearch.module.css";
import { useFetcher } from "react-router-dom";
import NavBar from "../NavBar";
import { HashLoader } from "react-spinners";
import { useEffect, useState, type FormEvent } from "react";
import { authProvider, BASE_URL } from "../../auth";

interface PokemonData {
  id: number;
  name: string;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
  weight: number;
  height: number;
}

interface PokemonFavs {
  id: number;
  pokemon_name: string;
  pokemon_id: string;
  pokemon_avatar_url: string;
  pokemon_type: string;
}

function useSearch() {
  const [pokemon, setPokemon] = useState<string | number>("");
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  const [errorSearch, setErrorSearch] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSearch(pokemonName: string | number) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    //personalizo error
    const err =
      typeof pokemonName === "number" && pokemonName > 1025
        ? "No hay más de 1025 pokémon"
        : "Pokémon no encontrado";
    //seteo error a null para que no se muestre despues de una busqueda fallida
    setErrorSearch(null);
    setLoading(true);

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(err);
      const data: PokemonData = await response.json();
      setPokemonData(data);
    } catch (error) {
      setErrorSearch((error as Error).message);
      setPokemonData(null);
    } finally {
      setLoading(false);
    }
  }

  const imageUrl = pokemonData?.sprites.other["official-artwork"].front_default;

  const typeColors: Record<string, string> = {
    normal: "rgba(170, 166, 127, 1)",
    fire: "rgba(245, 125, 49, 1)",
    water: "rgba(100, 147, 235, 1)",
    electric: "rgba(249, 207, 48, 1)",
    grass: "rgba(116, 203, 72, 1)",
    ice: "rgba(154, 214, 223, 1)",
    fighting: "rgba(193, 34, 57, 1)",
    poison: "rgba(164, 62, 158, 1)",
    ground: "rgba(222, 193, 107, 1)",
    flying: "rgba(168, 145, 236, 1)",
    psychic: "rgba(251, 85, 132, 1)",
    bug: "rgba(167, 183, 35, 1)",
    rock: "rgba(182, 158, 49, 1)",
    ghost: "rgba(112, 85, 155, 1)",
    dragon: "rgba(112, 55, 255, 1)",
    dark: "rgba(117, 87, 76, 1)",
    steel: "rgba(183, 185, 208, 1)",
    fairy: "rgba(230, 158, 172, 1)",
  };

  return {
    pokemon,
    setPokemon,
    handleSearch,
    pokemonData,
    imageUrl,
    typeColors,
    errorSearch,
    loading,
  };
}

function PokeSearch() {
  const Fetcher = useFetcher();
  const [pokemonFavs, setPokemonFavs] = useState<PokemonFavs[] | []>([]);

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

  useEffect(() => {
    async function loadFavorites() {
      const url = `${BASE_URL}/favorites`;
      const options: RequestInit = {
        headers: { Authorization: `Bearer ${authProvider.token}` },
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error("Error al cargar favoritos");
        const data = await response.json();
        setPokemonFavs(data);
        console.log("ejecutado");
        localStorage.setItem("pokemon_favs", JSON.stringify(data));
      } catch (error) {
        return { error: (error as Error).message };
      }
    }

    loadFavorites();
  }, []);

  const isFavorite =
    pokemonData &&
    pokemonFavs.some((fav) => Number(fav.pokemon_id) === pokemonData.id);

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

        {errorSearch && pokemon !== "" && (
          <p className={s.error}>{errorSearch}</p>
        )}

        {loading ? (
          <HashLoader size={100} className={s.spinner} />
        ) : (
          pokemonData && (
            <>
              <div className={s.cardTitle}>
                <h1>{pokemonData.name}</h1>
                <h3>
                  {pokemonData.id < 1000
                    ? `#${pokemonData.id.toString().padStart(3, "0")}`
                    : `#${pokemonData.id}`}
                </h3>
              </div>

              <img
                src={imageUrl}
                alt={pokemonData.name}
                className={s.imgSearch}
              />

              <div className={s.cardLabel}>
                {pokemonData.types.map((t) => {
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

              <button className={s.buttonFav}>
                {isFavorite ? (
                  <img src="src/images/fav-on.svg" alt="favorite" />
                ) : (
                  <img src="src/images/fav-off.svg" alt="no-favorite" />
                )}
                <span>
                  {isFavorite ? "Remove Favorite" : "Mark as Favorite"}
                </span>
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
