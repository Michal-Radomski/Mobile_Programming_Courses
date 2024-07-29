import { View, FlatList, StyleSheet } from "react-native";

import MealItem from "./MealItem";
import Meal from "../../models/meal";

function MealsList({ items }: { items: Meal[] }): JSX.Element {
  function renderMealItem(itemData: { item: Meal }): JSX.Element {
    const item = itemData.item;

    const mealItemProps = {
      id: item.id,
      title: item.title,
      imageUrl: item.imageUrl,
      affordability: item.affordability,
      complexity: item.complexity,
      duration: item.duration,
    };
    return <MealItem {...(mealItemProps as Meal)} />;
  }

  return (
    <View style={styles.container}>
      <FlatList data={items} keyExtractor={(item: Meal) => item.id} renderItem={renderMealItem} />
    </View>
  );
}

export default MealsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
