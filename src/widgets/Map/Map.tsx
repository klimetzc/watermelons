import { RootState } from 'app/store';
import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useSelector } from 'react-redux';

interface IMap {
  center: [number, number];
  zoom: number;
  children?: React.ReactNode;
}

const Map: React.FC<IMap> = ({ center, zoom, children }) => {
  const isDarkTheme = useSelector(
    (state: RootState) => state.themeReducer.darkThemeEnabled
  );
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom
      style={{
        height: '500px',
        width: '100%',
        borderRadius: '15px',
        marginBottom: '20px',
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={
          isDarkTheme
            ? 'https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token={accessToken}'
            : 'https://{s}.tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token={accessToken}'
        }
        accessToken="MUyFS56eCAQG6L6PcpUff8OolqB66NtLBn9NPsiMZ48RNrLUp4B0PDNFBNo3Ejd7"
      />
      {children}
    </MapContainer>
  );
};

export default Map;
