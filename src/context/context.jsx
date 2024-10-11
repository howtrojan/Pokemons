import { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storageFavorites = Object.keys(localStorage).map((key) => {
      return JSON.parse(localStorage.getItem(key));
    }).filter(Boolean);
    setFavorites(storageFavorites);
  }, []);

  const addFavorite = (pokemon) => {
    if (!pokemon || !pokemon.name || favorites.some((fav) => fav.name === pokemon.name)) return;
    const favoriteData = { name: pokemon.name, image: pokemon.image };
    localStorage.setItem(pokemon.name, JSON.stringify(favoriteData));
    setFavorites((prevFavorites) => [...prevFavorites, favoriteData]);
  };

  const removeFavorite = (pokemon) => {
    if (!pokemon || !pokemon.name) return;
    localStorage.removeItem(pokemon.name);
    setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.name !== pokemon.name));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
