// @ts-ignore
import { REACT_APP_GOOGLE_API_KEY } from "@env";
// console.log({ REACT_APP_GOOGLE_API_KEY });

export function getMapPreview(lat: number, lng: number): string {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${REACT_APP_GOOGLE_API_KEY}`;
  return imagePreviewUrl;
}
