import React from "react";
import { View, Text, StyleSheet } from "react-native";

function List({ data }: { data: string[] }): JSX.Element {
  const renderedList: JSX.Element[] = data.map((dataPoint: string) => (
    <View key={dataPoint} style={styles.listItem}>
      <Text style={styles.itemText}>{dataPoint}</Text>
    </View>
  ));
  return <React.Fragment>{renderedList}</React.Fragment>;
}

export default List;

const styles = StyleSheet.create({
  listItem: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 4,
    marginHorizontal: 12,
    backgroundColor: "#e2b497",
  },
  itemText: {
    color: "#351401",
    textAlign: "center",
  },
});
