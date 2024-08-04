interface PlaceI {
  id: string;
  imageUri: string;
  title: string;
  address: string;
  location?: LocationI;
}

interface LocationI {
  lat: number;
  lng: number;
}
