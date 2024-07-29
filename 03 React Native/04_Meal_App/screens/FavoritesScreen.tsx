import React from "react";
import { View, Text, StyleSheet } from "react-native";

import FavoritesContext, { ContextProps } from "../store/context/FavoritesContext";
import { MEALS } from "../data/dummy-data";
import Meal from "../models/meal";
import MealsList from "../components/MealList/MealList";

function FavoritesScreen(): JSX.Element {
  const favoriteMealsCtx: ContextProps = React.useContext<ContextProps>(
    FavoritesContext as unknown as React.Context<ContextProps>
  );

  const favoriteMeals: Meal[] = MEALS?.filter((meal: Meal) => favoriteMealsCtx?.ids?.includes(meal.id));
  console.log({ favoriteMeals });

  if (favoriteMeals.length === 0) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.text}>You have no favorite meals yet.</Text>
      </View>
    );
  }

  return <MealsList items={favoriteMeals as Meal[]} />;
}

export default FavoritesScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
