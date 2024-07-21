import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";

export default function App(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={{ color: "red" }}>Hello World!</Text>
      <View>
        <Text>Another Text!</Text>
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
});
