import React from "react";

export const FavoritesContext = React.createContext({
  ids: [] as string[],
  addFavorite: (_id: string) => {},
  removeFavorite: (_id: string) => {},
});

function FavoritesContextProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [favoriteMealIds, setFavoriteMealIds] = React.useState<string[]>([]);

  function addFavorite(id: string) {
    setFavoriteMealIds((currentFavIds: string[]) => [...currentFavIds, id]);
  }

  function removeFavorite(id: string) {
    setFavoriteMealIds((currentFavIds) => currentFavIds.filter((mealId) => mealId !== id));
  }

  const value = {
    ids: favoriteMealIds,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export default FavoritesContextProvider;
