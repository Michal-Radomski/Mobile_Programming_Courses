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
import { createUserWithEmailAndPassword } from "@firebase/auth";

// import { Auth, AuthContext } from "../auth";
import { useAuth } from "../auth";
import { auth } from "../firebase";

const RegisterPage: React.FC<{}> = () => {
  const { loggedIn } = useAuth();
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [status, setStatus] = React.useState<ObjectI>({ loading: false, error: false });

  const handleRegister = async () => {
    try {
      setStatus({ loading: true, error: false });
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("credential:", credential);
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
          <IonTitle>Register</IonTitle>
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
        {status.error && <IonText color="danger">Registration failed</IonText>}
        <IonButton expand="block" onClick={handleRegister}>
          Create Account
        </IonButton>
        <IonButton expand="block" fill="clear" routerLink="/login">
          Already have an account?
        </IonButton>
        <IonLoading isOpen={status.loading as boolean} />
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
