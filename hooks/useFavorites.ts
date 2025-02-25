"use client";

import { useState, useEffect } from "react";
import { IProduct } from "@/types/types";

const useFavorites = () => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<IProduct[]>([]);

  useEffect(() => {
    const storedFavorites: IProduct[] = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(storedFavorites);
    setFavoriteIds(storedFavorites.map((item) => item.id));
  }, []);

  const toggleFavorite = (product: IProduct) => {
    let favorites: IProduct[] = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );

    if (favoriteIds.includes(product.id)) {
      favorites = favorites.filter((item) => item.id !== product.id);
      setFavoriteIds(favorites.map((item) => item.id));
    } else {
      favorites.push(product);
      setFavoriteIds([...favoriteIds, product.id]);
    }

    setFavorites(favorites);
    setFavoriteIds(favorites.map((item) => item.id));
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  return { favorites, favoriteIds, toggleFavorite };
};

export default useFavorites;
