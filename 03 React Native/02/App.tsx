import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";

export default function App(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={{ color: "red", fontWeight: "bold", margin: 16, borderWidth: 2, borderColor: "red", padding: 8 }}>
        Hello World!
      </Text>
      <View>
        <Text style={styles.dummyText}>Another Text!</Text>
        <Text>Another Text2!</Text>
      </View>

      <Button title="Tap me" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  dummyText: {
    margin: 16,
    // backgroundColor: "yellow",
    color: "green",
  },
});
