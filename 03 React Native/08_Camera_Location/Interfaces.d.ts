interface PlaceI {
  address: string;
  // Todo: refactor!
  id: string;
  imageUri: string;
  title: string;
  // address: string;
  lat?: number;
  lng?: number;
  location: LocationI;
}

interface LocationI {
  address?: string;
  lat: number;
  lng: number;
}

declare module "@env" {
  export const REACT_APP_GOOGLE_API_KEY: string;
}

interface ObjectI {
  [key: string]: string | number;
}
