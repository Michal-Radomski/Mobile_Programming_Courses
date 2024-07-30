import React from "react";

export interface ContextProps {
  ids: string[];
  addFavorite: Function;
  removeFavorite: Function;
}

export const FavoritesContext = React.createContext({} as ContextProps);

export const FavoritesContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }): JSX.Element => {
  const [favoriteMealIds, setFavoriteMealIds] = React.useState<string[]>([] as string[]);

  function addFavorite(id: string): void {
    setFavoriteMealIds((currentFavIds: string[]) => [...currentFavIds, id]);
  }

  function removeFavorite(id: string): void {
    setFavoriteMealIds((currentFavIds: string[]) => currentFavIds.filter((mealId: string) => mealId !== id));
  }

  const value = {
    ids: favoriteMealIds,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
  } as ContextProps;

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};
