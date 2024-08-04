interface PlaceI {
  id: string;
  imageUri: string;
  title: string;
  address: string;
  Location?: LocationI;
}

interface LocationI {
  lat: number;
  lng: number;
}
