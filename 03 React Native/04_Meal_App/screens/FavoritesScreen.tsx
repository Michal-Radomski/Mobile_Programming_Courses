import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

// import { FavoritesContext, ContextProps } from "../store/context/FavoritesContext";
import { MEALS } from "../data/dummy-data";
import Meal from "../models/meal";
import MealsList from "../components/MealList/MealList";
import { RootState } from "./MealDetailScreen";

function FavoritesScreen(): JSX.Element {
  //* Context
  // const favoriteMealsCtx: ContextProps = React.useContext(FavoritesContext);

  // const favoriteMeals: Meal[] = MEALS?.filter((meal: Meal) => favoriteMealsCtx?.ids?.includes(meal?.id));

  //* Redux-Toolkit
  const favoriteMealIds = useSelector((state: RootState) => state.favoriteMeals.ids);

  const favoriteMeals: Meal[] = MEALS.filter((meal) => favoriteMealIds.includes(meal.id));

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
