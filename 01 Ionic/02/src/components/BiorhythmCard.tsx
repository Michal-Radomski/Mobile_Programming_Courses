import React from "react";
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from "@ionic/react";
import dayjs from "dayjs";

import { calculateBiorhythms } from "../lib/biorhythms";
import BiorhythmChart from "./BiorhythmChart";

function formatDate(isoString: string): string {
  const day = dayjs(isoString);
  return day.format("DD MMMM YYYY");
}

const BiorhythmCard = ({ birthDate, targetDate }: { birthDate: string; targetDate: string }): JSX.Element => {
  // console.log({ birthDate, targetDate });
  const biorhythms = calculateBiorhythms(birthDate, targetDate);

  return (
    <React.Fragment>
      <IonCard className="BiorhythmCard ion-text-center">
        <IonCardHeader>
          <IonCardTitle>{formatDate(targetDate)}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <BiorhythmChart birthDate={birthDate} targetDate={targetDate} />
          <p className="physical">Physical: {biorhythms.physical.toFixed(4)}</p>
          <p className="emotional">Emotional: {biorhythms.emotional.toFixed(4)}</p>
          <p className="intellectual">Intellectual: {biorhythms.intellectual.toFixed(4)}</p>
        </IonCardContent>
      </IonCard>
    </React.Fragment>
  );
};

export default BiorhythmCard;
