import React from "react";
import { IonApp, IonContent, IonHeader, IonInput, IonTitle, IonToolbar } from "@ionic/react";

import "./App.scss";

const App = (): JSX.Element => {
  const [name, setName] = React.useState<string>("");

  return (
    <React.Fragment>
      <IonApp>
        <IonHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <IonToolbar placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <IonTitle placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              My App
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent
          className="ion-padding"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <IonInput
            value={name}
            onIonChange={(event) => setName(event.detail.value!)} //* normally: onChange
            placeholder="Your name"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
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
