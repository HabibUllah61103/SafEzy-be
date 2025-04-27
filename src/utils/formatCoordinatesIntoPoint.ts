import { Point } from 'geojson';

export default function formatCoordinatesIntoPoint(
  long: number,
  lat: number,
): Point {
  return {
    type: 'Point',
    coordinates: [long, lat],
  };
}
