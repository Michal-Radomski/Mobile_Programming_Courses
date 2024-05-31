import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";

const SettingsPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Daily Moments - Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* Go to <IonRouterLink routerLink={"/home"}>Home</IonRouterLink> */}
        SettingsPage
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
