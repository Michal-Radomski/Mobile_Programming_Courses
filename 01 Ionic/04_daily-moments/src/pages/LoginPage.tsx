import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from "@ionic/react";

interface Props {
  onLogin: () => void;
}

const LoginPage: React.FC<Props> = ({ onLogin }) => {
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
