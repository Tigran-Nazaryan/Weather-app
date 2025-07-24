import { createContext, useContext, useState, useEffect } from "react";
import storageServices from "../services/storageServices.js";
import {FAVORITE_KEY} from "../services/constant.js";

const FavoritesContext = createContext();
const getInitialFavorites = () => storageServices.getItem(FAVORITE_KEY) ?? [];

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(getInitialFavorites);

    useEffect(() => {
        storageServices.setItem(FAVORITE_KEY, favorites);
    }, [favorites]);

    const addFavorite = (city) => {
        const normalized = city.trim().toLowerCase();

        setFavorites((prev) => {
            const alreadyExists = prev.some(c => c.trim().toLowerCase() === normalized);
            return alreadyExists ? prev : [...prev, city.trim()];
        });
    };

    const removeFavorite = (city) => {
        const normalized = city.trim().toLowerCase();
        setFavorites((prev) => prev.filter((c) => c.trim().toLowerCase() !== normalized));
    };


    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => useContext(FavoritesContext);
