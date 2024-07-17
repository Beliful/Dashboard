import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const EarthObservation = () => {
  return (
    <div style={{ height: '500px' }}>
      <MapContainer center={[39, 35]} zoom={6} scrollWheelZoom={true} style={{ height: '100%' }}>
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution='Tiles © Esri &mdash; Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community'
          maxZoom={20}
        />
      </MapContainer>
    </div>
  );
};

export default EarthObservation;
