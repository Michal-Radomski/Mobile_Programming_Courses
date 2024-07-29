//* Bottom Tabs
import { View, Text, StyleSheet } from "react-native";

function UserScreen(): JSX.Element {
  return (
    <View style={styles.rootContainer}>
      <Text>
        This is the <Text style={styles.highlight}>"User"</Text> screen!
      </Text>
    </View>
  );
}

export default UserScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  highlight: {
    fontWeight: "bold",
    color: "#eb1064",
  },
});

//* Drawer
// import { View, Text, Button, StyleSheet } from "react-native";
// import { ParamListBase, NavigationProp } from "@react-navigation/native";

// function UserScreen({ navigation }: { navigation: NavigationProp<ParamListBase> }): JSX.Element {
//   function openDrawerHandler(): void {
//     (navigation as any).toggleDrawer();
//   }

//   return (
//     <View style={styles.rootContainer}>
//       <Text>
//         This is the <Text style={styles.highlight}>"User"</Text> screen!
//       </Text>
//       <Button title="Open Drawer" onPress={openDrawerHandler} />
//     </View>
//   );
// }

// export default UserScreen;

// const styles = StyleSheet.create({
//   rootContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   highlight: {
//     fontWeight: "bold",
//     color: "#eb1064",
//   },
// });
