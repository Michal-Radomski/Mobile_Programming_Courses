interface PlaceI {
  // Todo: refactor!
  id: string;
  imageUri: string;
  title: string;
  address: string;
  lat: number;
  lng: number;
}

interface LocationI {
  lat: number;
  lng: number;
}

declare module "@env" {
  export const REACT_APP_GOOGLE_API_KEY: string;
}
