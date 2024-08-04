import React from "react";

import PlacesList from "../components/Places/PlacesList";

const AllPlaces = (): JSX.Element => {
  return (
    <React.Fragment>
      <PlacesList places={[]} />
    </React.Fragment>
  );
};

export default AllPlaces;
