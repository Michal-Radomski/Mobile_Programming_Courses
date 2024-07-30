import React from "react";
import { useRoute, RouteProp, ParamListBase, NavigationProp } from "@react-navigation/native";

import { CATEGORIES, MEALS } from "../data/dummy-data";
import Meal from "../models/meal";
import Category from "../models/category";
import MealsList from "../components/MealList/MealList";

function MealsOverviewScreen({ navigation }: { navigation: NavigationProp<ParamListBase> }): JSX.Element {
  const route: RouteProp<ParamListBase> = useRoute();
  const catId = (route?.params as any)?.categoryId as string;

  const displayedMeals: Meal[] = MEALS?.filter((mealItem: Meal) => {
    return mealItem.categoryIds.indexOf(catId) >= 0;
  });

  React.useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find((category: Category) => category.id === catId)?.title as string;

    navigation.setOptions({
      title: categoryTitle,
    });
  }, [catId, navigation]);

  return <MealsList items={displayedMeals} />;
}

export default MealsOverviewScreen;
