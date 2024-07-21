import React from "react";
import { Text, View } from "react-native";

export default function Flex(): JSX.Element {
  return (
    <View
      style={{
        marginLeft: 10,
        marginTop: 20,
        padding: 50,
        flexDirection: "row",
        // flexDirection: "column",
        width: "90%",
        height: 500,
        justifyContent: "space-between",
        alignItems: "stretch",
      }}
    >
      <View
        style={{
          backgroundColor: "red",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>1</Text>
      </View>
      <View
        style={{
          backgroundColor: "blue",
          flex: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>2</Text>
      </View>
      <View
        style={{
          flex: 0.5,
          backgroundColor: "green",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>3</Text>
      </View>
    </View>
  );
}
