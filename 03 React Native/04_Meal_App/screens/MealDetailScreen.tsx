import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { RouteProp, ParamListBase, NavigationProp } from "@react-navigation/native";

import { MEALS } from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";
import Meal from "../models/meal";
import IconButton from "../components/IconButton";

function MealDetailScreen({
  route,
  navigation,
}: {
  route: RouteProp<ParamListBase, "MealDetail">;
  navigation: NavigationProp<ParamListBase>;
}): JSX.Element {
  const mealId = (route?.params as any)?.mealId as string;

  const selectedMeal = MEALS.find((meal: Meal) => meal.id === mealId) as Meal;

  function headerButtonPressHandler(): void {
    console.log("Pressed!");
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <IconButton icon="star" color="white" onPress={headerButtonPressHandler} />;
      },
    });
  }, [navigation, headerButtonPressHandler]);

  return (
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={{ uri: selectedMeal?.imageUrl }} />
      <Text style={styles.title}>{selectedMeal?.title as string}</Text>
      <MealDetails
        duration={selectedMeal?.duration as number}
        complexity={selectedMeal?.complexity as string}
        affordability={selectedMeal?.affordability as string}
        textStyle={styles.detailText}
      />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={selectedMeal?.ingredients as string[]} />
          <Subtitle>Steps</Subtitle>
          <List data={selectedMeal?.steps as string[]} />
        </View>
      </View>
    </ScrollView>
  );
}

export default MealDetailScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  detailText: {
    color: "white",
  },
  listOuterContainer: {
    alignItems: "center",
  },
  listContainer: {
    width: "80%",
  },
});