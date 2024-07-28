import { FlatList } from "react-native";
import CategoryGridTile from "../components/CategoryGridTile";

import { CATEGORIES } from "../data/dummy-data";
import Category from "../models/category";

function renderCategoryItem(itemData: { item: Category }): JSX.Element {
  return <CategoryGridTile title={itemData.item.title} color={itemData.item.color} />;
}

function CategoriesScreen(): JSX.Element {
  return (
    <FlatList
      data={CATEGORIES as Category[]}
      keyExtractor={(item: Category) => item.id}
      renderItem={renderCategoryItem}
      numColumns={2}
    />
  );
}

export default CategoriesScreen;
