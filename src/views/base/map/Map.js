import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import CIcon from '@coreui/icons-react'
import { cilTruck } from '@coreui/icons';
import './Map.css';
import image from './icons8-tractor-50.png'
import tractors from 'src/data/tractor'

const iconTruck = new L.icon({
  iconUrl: image,
  iconSize: [30, 30], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

const Map = () => {
  return (
    <MapContainer center={[39, 35]} zoom={6} scrollWheelZoom={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      {tractors.map(tractor => (
        <Marker key={tractor.id} position={[tractor.location.latitude, tractor.location.longitude]} icon={iconTruck}>
          <Popup>
            {tractor.plateNumber}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;
