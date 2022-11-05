import React from 'react';
import { useMap } from 'react-leaflet';
import ButtonMelon from 'shared/ui/ButtonMelon/ButtonMelon';

const CenterMap = () => {
  const map = useMap();
  return (
    <ButtonMelon
      onClick={() => {
        map.setView([68.970663, 33.074918], 14);
      }}
      style={{ zIndex: 5000, position: 'absolute', right: 15, bottom: 15 }}
    >
      К заказу
    </ButtonMelon>
  );
};

export default CenterMap;
