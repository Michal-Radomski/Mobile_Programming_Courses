import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar, IonRouterLink } from "@ionic/react";

const SettingsPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Daily Moments - Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        Go to <IonRouterLink routerLink={"/home"}>Home</IonRouterLink>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
