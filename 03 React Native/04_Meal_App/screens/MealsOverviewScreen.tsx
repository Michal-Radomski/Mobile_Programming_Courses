import { View, Text, StyleSheet } from "react-native";
import { useRoute, RouteProp, ParamListBase } from "@react-navigation/native";

function MealsOverviewScreen(): JSX.Element {
  const route: RouteProp<ParamListBase> = useRoute();
  const catId = (route?.params as any)?.categoryId as string;

  return (
    <View style={styles.container}>
      <Text>Meals Overview Screen - {catId}</Text>
    </View>
  );
}

export default MealsOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
