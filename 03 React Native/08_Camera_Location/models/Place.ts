// Todo: refactor!
export class Place implements PlaceI {
  id: string;
  title: string;
  imageUri: string;
  address: string;
  location: { lat: number; lng: number; address: string };
  constructor(title: string, imageUri: string, location: LocationI, id?: string) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = location.address as string;
    this.location = { lat: location.lat, lng: location.lng, address: location.address as string }; // { lat: 0.141241, lng: 127.121 }
    // this.id = new Date().toString() + Math.random().toString();
    this.id = id as string;
  }
}
