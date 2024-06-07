import React from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonList,
  IonLabel,
  IonItem,
  IonInput,
  IonText,
  IonLoading,
} from "@ionic/react";
import { Redirect } from "react-router";
import { signInWithEmailAndPassword } from "@firebase/auth";

// import { Auth, AuthContext } from "../auth";
import { useAuth } from "../auth";
import { auth } from "../firebase";

const LoginPage: React.FC<{}> = () => {
  const { loggedIn } = useAuth();
  const [email, setEmail] = React.useState<string>(process.env.REACT_APP_USER as string);
  const [password, setPassword] = React.useState<string>(process.env.REACT_APP_PASSWORD as string);
  const [status, setStatus] = React.useState({ loading: false, error: false });

  const handleLogin = async () => {
    try {
      setStatus({ loading: true, error: false });
      // const credential = await signInWithEmailAndPassword(auth, email, password);
      // console.log("credential:", credential);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setStatus({ loading: false, error: true });
      console.log("error:", error);
    }
  };

  if (loggedIn) {
    return <Redirect to="/my/entries" />;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput type="email" value={email} onIonChange={(event) => setEmail(event.detail.value!)} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput type="password" value={password} onIonChange={(event) => setPassword(event.detail.value!)} />
          </IonItem>
        </IonList>
        {status.error && <IonText color="danger">Invalid credentials</IonText>}
        <IonButton expand="block" onClick={handleLogin}>
          Login
        </IonButton>
        <IonButton expand="block" fill="clear" routerLink="/register">
          Don't have an account?
        </IonButton>
        <IonLoading isOpen={status.loading} />
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
