import React from "react";
import { IonApp, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonTitle, IonToolbar } from "@ionic/react";

import "./App.scss";

const App = (): JSX.Element => {
  const [name, setName] = React.useState<string>("");
  const [birthDate, setBirthDate] = React.useState<string>("");

  return (
    <React.Fragment>
      <IonApp>
        <IonHeader>
          <IonToolbar>
            <IonTitle>My App</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonList>
            <IonItem>
              <IonLabel position="stacked">Name: </IonLabel>
              <IonInput
                type="text"
                value={name}
                onIonChange={(event) => setName(event.detail.value!)} //* normally: onChange
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Date of Birth: </IonLabel>
              <IonInput
                type="date"
                value={birthDate}
                onIonChange={(event) => setBirthDate(event.detail.value!)} //* normally: onChange
              />
            </IonItem>
          </IonList>

          <p>
            You entered: <b>{name}</b>, born on <b>{birthDate}</b>
          </p>
        </IonContent>
      </IonApp>
    </React.Fragment>
  );
};

export default App;
