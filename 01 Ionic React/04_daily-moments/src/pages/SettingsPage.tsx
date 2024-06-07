import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from "@ionic/react";
import { signOut } from "@firebase/auth";

import { auth } from "../firebase";

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
        <IonButton color="medium" expand="block" onClick={() => signOut(auth)}>
          Logout
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
