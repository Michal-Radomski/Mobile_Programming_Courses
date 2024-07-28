import { View, StyleSheet, FlatList } from "react-native";
import { useRoute, RouteProp, ParamListBase } from "@react-navigation/native";

import { MEALS } from "../data/dummy-data";
import Meal from "../models/meal";
import MealItem from "../components/MealItem";

function MealsOverviewScreen(): JSX.Element {
  const route: RouteProp<ParamListBase> = useRoute();
  const catId = (route?.params as any)?.categoryId as string;

  const displayedMeals: Meal[] = MEALS.filter((mealItem: Meal) => {
    return mealItem.categoryIds.indexOf(catId) >= 0;
  });

  function renderMealItem(itemData: { item: Meal }): JSX.Element {
    const item: Meal = itemData.item;

    const mealItemProps = {
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
