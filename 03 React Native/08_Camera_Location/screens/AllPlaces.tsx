import React from "react";
import { useIsFocused } from "@react-navigation/native";

import PlacesList from "../components/Places/PlacesList";

const AllPlaces = ({ route }: { route: any }): JSX.Element => {
  const [loadedPlaces, setLoadedPlaces] = React.useState([] as PlaceI[]);

  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (isFocused && route.params) {
      setLoadedPlaces((curPlaces) => [...curPlaces, route.params.place]);
    }
  }, [isFocused, route]);

  return <PlacesList places={loadedPlaces} />;
};

export default AllPlaces;
