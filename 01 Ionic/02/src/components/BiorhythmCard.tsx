import React from "react";
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from "@ionic/react";
import dayjs from "dayjs";

function formatDate(isoString: string): string {
  const day = dayjs(isoString);
  return day.format("DD MMMM YYYY");
}

const BiorhythmCard = ({ birthDate, targetDate }: { birthDate: string; targetDate: string }): JSX.Element => {
  // console.log({ birthDate, targetDate });

  return (
    <React.Fragment>
      <IonCard className="BiorhythmCard ion-text-center">
        <IonCardHeader>
          <IonCardTitle>{formatDate(targetDate)}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <p className="physical">Physical: ?</p>
          <p className="emotional">Emotional: ?</p>
          <p className="intellectual">Intellectual: ?</p>
        </IonCardContent>
      </IonCard>
    </React.Fragment>
  );
};

export default BiorhythmCard;
