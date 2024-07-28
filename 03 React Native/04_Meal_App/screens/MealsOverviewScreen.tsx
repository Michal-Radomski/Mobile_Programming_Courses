import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { useRoute, RouteProp, ParamListBase, NavigationProp } from "@react-navigation/native";

import { CATEGORIES, MEALS } from "../data/dummy-data";
import Meal from "../models/meal";
import MealItem from "../components/MealItem";
import Category from "../models/category";

function MealsOverviewScreen({ navigation }: { navigation: NavigationProp<ParamListBase> }): JSX.Element {
  const route: RouteProp<ParamListBase> = useRoute();
  const catId = (route?.params as any)?.categoryId as string;

  const displayedMeals: Meal[] = MEALS.filter((mealItem: Meal) => {
    return mealItem.categoryIds.indexOf(catId) >= 0;
  });

  React.useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find((category: Category) => category.id === catId)?.title as string;

    navigation.setOptions({
      title: categoryTitle,
    });
  }, [catId, navigation]);

  function renderMealItem(itemData: { item: Meal }): JSX.Element {
    const item: Meal = itemData.item;

    const mealItemProps = {
      id: item.id,
      title: item.title,
      imageUrl: item.imageUrl,
      affordability: item.affordability,
      complexity: item.complexity,
      duration: item.duration,
    };
    return <MealItem {...mealItemProps} />;
  }

  return (
    <View style={styles.container}>
      <FlatList data={displayedMeals} keyExtractor={(item: Meal) => item.id} renderItem={renderMealItem} />
    </View>
  );
}

export default MealsOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
