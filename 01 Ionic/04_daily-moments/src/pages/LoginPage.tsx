import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from "@ionic/react";
import { Redirect } from "react-router";

interface Props {
  loggedIn: boolean;
  onLogin: () => void;
}

const LoginPage: React.FC<Props> = ({ onLogin, loggedIn }) => {
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
