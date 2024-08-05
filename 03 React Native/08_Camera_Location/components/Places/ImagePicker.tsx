import { Alert, Button, View } from "react-native";
import { launchCameraAsync, useCameraPermissions, PermissionStatus, ImagePickerResult } from "expo-image-picker";

function ImagePicker(): JSX.Element {
  const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

  async function verifyPermissions(): Promise<boolean> {
    if (cameraPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert("Insufficient Permissions!", "You need to grant camera permissions to use this app.");
      return false;
    }

    return true;
  }

  async function takeImageHandler(): Promise<void> {
    const hasPermission: boolean = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image: ImagePickerResult = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    console.log({ image });
  }

  return (
    <View>
      <View></View>
      <Button title="Take Image" onPress={takeImageHandler} />
    </View>
  );
}

export default ImagePicker;