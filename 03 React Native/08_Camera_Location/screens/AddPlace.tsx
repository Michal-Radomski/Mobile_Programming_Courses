import React from "react";

import PlaceForm from "../components/Places/PlaceForm";

const AddPlace = ({ navigation }: { navigation: any }): JSX.Element => {
  function createPlaceHandler(place: LocationI): void {
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
