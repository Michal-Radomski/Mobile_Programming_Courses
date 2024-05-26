import React from "react";
import { IonApp, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonTitle, IonToolbar } from "@ionic/react";

import "./App.scss";

const App = (): JSX.Element => {
  const [name, setName] = React.useState<string>("");

  return (
    <React.Fragment>
      <IonApp>
        <IonHeader>
          <IonToolbar>
            <IonTitle>My App</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonItem>
            <IonLabel>Name: </IonLabel>
            <IonInput
              value={name}
              onIonChange={(event) => setName(event.detail.value!)} //* normally: onChange
            />
          </IonItem>
          <p>
            You entered:
            <b>{name}</b>
          </p>
        </IonContent>
      </IonApp>
    </React.Fragment>
  );
};

export default App;
