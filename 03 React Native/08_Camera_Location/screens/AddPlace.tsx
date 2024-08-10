import React from "react";

import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../util/database";
import { Place } from "../models/Place";

const AddPlace = ({ navigation }: { navigation: any }): JSX.Element => {
  async function createPlaceHandler(place: Place): Promise<void> {
    await insertPlace(place);
    navigation.navigate("AllPlaces", {
      place: place,
    });
  }

  return (
    <React.Fragment>
      <PlaceForm onCreatePlace={createPlaceHandler} />
    </React.Fragment>
  );
};

export default AddPlace;
