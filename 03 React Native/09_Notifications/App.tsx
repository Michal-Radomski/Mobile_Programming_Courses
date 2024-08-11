import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button, View, Alert, Platform } from "react-native";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

export default function App(): JSX.Element {
  React.useEffect(() => {
    async function configurePushNotifications(): Promise<void> {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      if (finalStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        Alert.alert("Permission required", "Push notifications need the appropriate permissions.");
        return;
      }

      const pushTokenData = await Notifications.getExpoPushTokenAsync({ projectId: "projectID" });
      console.log({ pushTokenData });

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.DEFAULT,
        });
      }
    }

    configurePushNotifications();
  }, []);

  React.useEffect(() => {
    const subscription1 = Notifications.addNotificationReceivedListener((notification) => {
      console.log("NOTIFICATION RECEIVED");
      console.log("notification:", notification);
      const userName = notification.request.content.data.userName;
      console.log({ userName });
    });

    const subscription2 = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log("NOTIFICATION RESPONSE RECEIVED");
      console.log({ response });
      const userName = response.notification.request.content.data.userName;
      console.log({ userName });
    });

    return () => {
      subscription1.remove();
      subscription2.remove();
    };
  }, []);

  function scheduleNotificationHandler() {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "My first local notification",
        body: "This is the body of the notification.",
        data: { userName: "Mich" },
      },
      trigger: {
        seconds: 5,
      },
    });
  }

  function sendPushNotificationHandler(): void {
    try {
      fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: "<Your Device Push Token>]",
          title: "Test - sent from a device!",
          body: "This is a test!",
        }),
      });
    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <React.Fragment>
      <View style={styles.container}>
        <Button title="Schedule Notification" onPress={scheduleNotificationHandler} />
        <Button title="Send Push Notification" onPress={sendPushNotificationHandler} />
        <StatusBar style="auto" />
      </View>
    </React.Fragment>
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
