import React from "react";
import { IonApp, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonTitle, IonToolbar } from "@ionic/react";

import "./App.scss";
import BiorhythmCard from "./components/BiorhythmCard";

const App = (): JSX.Element => {
  function getToday(): string {
    return new Date().toISOString().slice(0, "yyyy-mm-dd".length);
  }

  const [birthDate, setBirthDate] = React.useState<string>("");
  const [targetDate, setTargetDate] = React.useState<string>(getToday);

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
              <IonLabel position="stacked">Date of Birth: </IonLabel>
              <IonInput
                type="date"
                value={birthDate}
                onIonChange={(event) => setBirthDate(event.detail.value!)} //* normally: onChange
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Target Date: </IonLabel>
              <IonInput type="date" value={targetDate} onIonChange={(event) => setTargetDate(event.detail.value!)} />
            </IonItem>
          </IonList>

          {/* <p>
            Born on <b>{birthDate}</b>, target date: <b>{targetDate}</b>
          </p> */}

          <BiorhythmCard birthDate={birthDate} targetDate={targetDate} />
        </IonContent>
      </IonApp>
    </React.Fragment>
  );
};

export default App;
