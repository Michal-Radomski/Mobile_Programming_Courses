import { FlatList } from "react-native";
import CategoryGridTile from "../components/CategoryGridTile";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

import { CATEGORIES } from "../data/dummy-data";
import Category from "../models/category";

function CategoriesScreen({ navigation }: { navigation: NavigationProp<ParamListBase> }): JSX.Element {
  function renderCategoryItem(itemData: { item: Category }) {
    function pressHandler() {
      navigation.navigate("MealsOverview", {
        categoryId: itemData.item.id,
      });
    }

    return <CategoryGridTile title={itemData.item.title} color={itemData.item.color} onPress={pressHandler} />;
  }

  return <FlatList data={CATEGORIES} keyExtractor={(item) => item.id} renderItem={renderCategoryItem} numColumns={2} />;
}

export default CategoriesScreen;
