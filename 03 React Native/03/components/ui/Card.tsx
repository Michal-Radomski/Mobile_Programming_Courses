import React from "react";
import { View, StyleSheet } from "react-native";

import Colors from "../../constants/colors";

function Card({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <React.Fragment>
      <View style={styles.card}>{children}</View>
    </React.Fragment>
  );
}

export default Card;

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 36,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: Colors.primary800,
    borderRadius: 8,
    elevation: 4, //* Instead of shadow, only for android!
    shadowColor: Colors.colorBlack,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
});
