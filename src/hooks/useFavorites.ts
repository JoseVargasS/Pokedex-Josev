import { useEffect, useState } from "react";
import { authProvider, BASE_URL } from "../auth";
import type { PokemonData } from "./useSearch";

interface PokemonFavs {
  id: number;
  pokemon_name: string;
  pokemon_id: string;
  pokemon_avatar_url: string;
  pokemon_type: string;
}

export function useFavorites(pokemonData?: PokemonData, imageUrl?: string) {
  const [pokemonFavs, setPokemonFavs] = useState<PokemonFavs[] | []>([]);
  const isFavorite =
    pokemonData &&
    pokemonFavs.some((fav) => Number(fav.pokemon_id) === pokemonData.id);

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
      localStorage.setItem("pokemon_favs", JSON.stringify(data));
    } catch (error) {
      return { error: (error as Error).message };
    }
  }

  useEffect(() => {
    const storedFavs = localStorage.getItem("pokemon_favs");
    if (storedFavs) return setPokemonFavs(JSON.parse(storedFavs));
    loadFavorites();
  }, []);

  async function addFavorites() {
    const url = `${BASE_URL}/favorites`;
    const options = {
      method: "POST",
      body: JSON.stringify({
        pokemon_name: pokemonData?.name,
        pokemon_id: pokemonData?.id,
        pokemon_type: pokemonData?.types[0].type.name,
        pokemon_avatar_url: imageUrl,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authProvider.token}`,
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error("Error al agregar a favoritos");
      const data = await response.json();
      localStorage.setItem(
        "pokemon_favs",
        JSON.stringify([...pokemonFavs, data])
      );
      setPokemonFavs((prevFavs) => [...prevFavs, data]);
      console.log(pokemonFavs);
    } catch (error) {
      return { error: (error as Error).message };
    }
  }

  async function removeFavorites() {
    const favoriteToRemove =
      pokemonData &&
      pokemonFavs.find((fav) => Number(fav.pokemon_id) === pokemonData.id);

    const url = `${BASE_URL}/favorites/${favoriteToRemove?.id}`;
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authProvider.token}`,
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error("Error al agregar a favoritos");
      const updatedFavs = pokemonFavs.filter(
        (fav) => fav.id !== favoriteToRemove?.id
      );
      setPokemonFavs(updatedFavs);
      localStorage.setItem("pokemon_favs", JSON.stringify(updatedFavs));
    } catch (error) {
      return { error: (error as Error).message };
    }
  }

  function toggleFavorite() {
    if (isFavorite) {
      removeFavorites();
    } else addFavorites();
  }

  return { pokemonFavs, isFavorite, toggleFavorite };
}
