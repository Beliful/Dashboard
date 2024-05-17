import React, {useState} from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './Map.css';

const Map = () => {
  return (
    <MapContainer center={[40, 0]} zoom={1} scrollWheelZoom={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        minZoom={1.6}
      />
    </MapContainer>
  );
}

export default Map

// const Map = () => {
//   const [satellitePosition, setSatellitePosition] = useState(null);

//   // Simulated satellite data for demonstration purposes
//   useEffect(() => {
//     const interval = setInterval(() => {
//       // Simulate fetching updated satellite position data
//       const newSatellitePosition = {
//         lat: Math.random() * 180 - 90, // Random latitude (-90 to 90)
//         lng: Math.random() * 360 - 180 // Random longitude (-180 to 180)
//       };
//       setSatellitePosition(newSatellitePosition);
//     }, 5000); // Update satellite position every 5 seconds

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <MapContainer center={[0, 0]} zoom={1} style={{ height: "400px", width: "100%" }}>
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//       />
//       {satellitePosition && (
//         <Marker position={[satellitePosition.lat, satellitePosition.lng]}>
//           {/* You can customize the marker icon to represent a satellite */}
//           {/* <Icon icon={satelliteIcon} /> */}
//         </Marker>
//       )}
//     </MapContainer>
//   );
// }

// export default Map;
