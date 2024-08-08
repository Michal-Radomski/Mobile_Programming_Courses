// @ts-ignore
import { REACT_APP_GOOGLE_API_KEY } from "@env";
// console.log({ REACT_APP_GOOGLE_API_KEY });

export function getMapPreview(lat: number, lng: number): string {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${REACT_APP_GOOGLE_API_KEY}`;
  return imagePreviewUrl;
}

export async function getAddress(lat: number, lng: number): Promise<string | undefined> {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${REACT_APP_GOOGLE_API_KEY}`;

  try {
    const response = await fetch(url);
    // console.log("response:", response);

    // if (!response.ok) {
    //   throw new Error("Failed to fetch address!");
    // }

    const data = await response.json();
    const address = (await data.results[0].formatted_address) as string;
    return address;
  } catch (error) {
    console.log("error:", error);
  }
}
