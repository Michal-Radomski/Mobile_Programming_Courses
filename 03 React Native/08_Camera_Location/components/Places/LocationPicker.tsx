import { Alert, View, StyleSheet } from "react-native";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus, LocationObject } from "expo-location";

import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";

function LocationPicker(): JSX.Element {
  const [locationPermissionInformation, requestPermission] = useForegroundPermissions();

  async function verifyPermissions(): Promise<boolean> {
    if (locationPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (locationPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert("Insufficient Permissions!", "You need to grant location permissions to use this app.");
      return false;
    }

    return true;
  }

  async function getLocationHandler(): Promise<void> {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const location: LocationObject = await getCurrentPositionAsync();
    console.log({ location });
  }

  function pickOnMapHandler() {}

  return (
    <View>
      <View style={styles.mapPreview}></View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
