import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import PlaceItem from "./PlaceItem";
import { Colors } from "../../constants/colors";

const PlacesList = ({ places }: { places: PlaceI[] }): JSX.Element => {
  if (!places || places?.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>No places added yet - start adding some!</Text>
      </View>
    );
  }

  return (
    <React.Fragment>
      <FlatList
        data={places}
        keyExtractor={(item: PlaceI) => item.id}
        renderItem={({ item }: { item: PlaceI }) => <PlaceItem place={item} />}
      />
    </React.Fragment>
  );
};

export default PlacesList;

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
