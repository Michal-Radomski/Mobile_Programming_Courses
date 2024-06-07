import React from "react";
import { IonApp, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonTitle, IonToolbar } from "@ionic/react";

import "./App.scss";
import BiorhythmCard from "./components/BiorhythmCard";
import { useStoredState } from "./lib/hook";

const App = (): JSX.Element => {
  function getToday(): string {
    return new Date().toISOString().slice(0, "yyyy-mm-dd".length);
  }

  const [birthDate, setBirthDate] = useStoredState("birthDate", "");
  const [targetDate, setTargetDate] = React.useState<string>(getToday);

  return (
    <React.Fragment>
      <IonApp>
        <IonHeader>
          <IonToolbar color={"primary"}>
            <IonTitle>React Ionic Course (biorhythms - pseudoscience)</IonTitle>
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

          {Boolean(birthDate) ? <BiorhythmCard birthDate={birthDate} targetDate={targetDate} /> : null}
        </IonContent>
      </IonApp>
    </React.Fragment>
  );
};

export default App;

//* Test only
// console.log("Boolean('test'):", Boolean("test"));
