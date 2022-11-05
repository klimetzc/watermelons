import L from 'leaflet';
import watermelonLight from 'shared/assets/icons/watermelon-emoji.svg';
import watermelonDark from 'shared/assets/icons/watermelon-emoji-dark.svg';

export const markerMe = new L.Icon({
  iconUrl: watermelonLight,
  iconRetinaUrl: watermelonLight,
  popupAnchor: [-0, -0],
  iconSize: [32, 45],
});

export const markerOrder = new L.Icon({
  iconUrl: watermelonDark,
  iconRetinaUrl: watermelonDark,
  popupAnchor: [-0, -0],
  iconSize: [32, 45],
});
