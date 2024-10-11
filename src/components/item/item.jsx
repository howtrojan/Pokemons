import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./item.css";
import Heart from "../heart/heart";
import {Button} from "../button/button";
import {FavoritesContext} from "../../context/context";

const PokemonCard = ({ pokemon, handleFavorite }) => {
  return (
    <div className="card">
      <div className="card-infos">
        <img src={pokemon.image} alt={pokemon.name} />
        <p>{pokemon.name}</p>
      </div>
      <div className="card-heart">
        <Heart
          handleClick={() => handleFavorite(pokemon)}
          selected={pokemon.favorite}
        />
      </div>
      <Button className="btn" onClick=''>Mais detalhes</Button>
    </div>
  );
};

const Item = () => {
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20"
      );
      const pokemons = response.data.results;
      const details = await Promise.all(
        pokemons.map(async (pokemon) => {
          const res = await axios.get(pokemon.url);
          return {            
            name: pokemon.name,
            image: res.data.sprites.front_default,
            favorite: favorites.some((fav) => fav.name === pokemon.name),
          };
        })
      );
      setPokemonDetails(details);
    };
    fetchData();
  }, [favorites]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
    if (storedFavorites) {
      storedFavorites.forEach((fav) => addFavorite(fav));
    }
  }, [addFavorite]);

  const handleFavorite = (pokemon) => {
    if (favorites.some((fav) => fav.name === pokemon.name)) {
      removeFavorite(pokemon);
    } else {
      addFavorite(pokemon);
    }
  };

  return (
    <>
      {pokemonDetails.map((pokemon) => (
        <PokemonCard
          key={pokemon.name}
          pokemon={pokemon}
          handleFavorite={handleFavorite}
        />
      ))}
    </>
  );
};

export default Item;

