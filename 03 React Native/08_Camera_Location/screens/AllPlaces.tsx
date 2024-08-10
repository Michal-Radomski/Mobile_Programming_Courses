import React from "react";
import { useIsFocused } from "@react-navigation/native";

import PlacesList from "../components/Places/PlacesList";
import { fetchPlaces } from "../util/database";

const AllPlaces = ({ route }: { route: any }): JSX.Element => {
  const [loadedPlaces, setLoadedPlaces] = React.useState([] as PlaceI[]);

  const isFocused = useIsFocused();

  React.useEffect(() => {
    async function loadPlaces() {
      const places = await fetchPlaces();
      setLoadedPlaces(places as PlaceI[]);
    }

    // if (isFocused && route.params) {
    //   setLoadedPlaces((curPlaces) => [...curPlaces, route.params.place]);
    // }
    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused]);

  return <PlacesList places={loadedPlaces} />;
};

export default AllPlaces;
