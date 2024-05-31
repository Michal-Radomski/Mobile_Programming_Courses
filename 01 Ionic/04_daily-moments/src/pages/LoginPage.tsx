import React from "react";
import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from "@ionic/react";
import { Redirect } from "react-router";

// import { Auth, AuthContext } from "../auth";
import { useAuth } from "../auth";

interface Props {
  onLogin: () => void;
}

const LoginPage: React.FC<Props> = ({ onLogin }) => {
  const { loggedIn } = useAuth();

  if (loggedIn) {
    return <Redirect to="/my/entries" />;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Daily Moments - Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={onLogin}>
          Login
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
