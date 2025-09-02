import { useContext, useState } from "react";
import { t } from "../translate";
import { TranslateContext } from "../contexts/Translate";

export interface PokemonData {
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

export function useSearch() {
  const [pokemon, setPokemon] = useState<string | number>("");
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
  const [errorSearch, setErrorSearch] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { lang } = useContext(TranslateContext);

  async function handleSearch(pokemonName: string | number) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    //personalizo error
    const err =
      pokemonName === "number" && Number(pokemonName) > 1025
        ? "No hay más de 1025 pokémon"
        : t[lang].errSearch;
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
