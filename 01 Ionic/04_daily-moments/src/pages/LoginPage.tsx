import React from "react";
import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from "@ionic/react";
import { Redirect } from "react-router";
import { signInWithEmailAndPassword } from "@firebase/auth";

// import { Auth, AuthContext } from "../auth";
import { useAuth } from "../auth";
import { auth } from "../firebase";

interface Props {
  onLogin: () => void;
}

const LoginPage: React.FC<Props> = ({ onLogin }) => {
  const { loggedIn } = useAuth();

  const user = process.env.REACT_APP_USER as string;
  const password = process.env.REACT_APP_PASSWORD as string;
  // console.log({ user, password });

  const handleLogin = async () => {
    const credentials = await signInWithEmailAndPassword(auth, user, password);
    console.log("credentials:", credentials);
  };

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
        <IonButton expand="block" onClick={handleLogin}>
          Login
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
