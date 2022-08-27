import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

const Map = () => {
  return (
    <MapContainer
      center={[25.253056, 55.329167]}
      zoom={14}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic2hla29vZmVoIiwiYSI6ImNrd2plcGMxbDFoZnQyd21wMXI5ZDd5b3MifQ.6LBD1p1QPAnlz_cqLJeohg`}
      />
      <Marker position={[25.253056, 55.329167]} draggable={true}>
        <Popup>باتینو اینجاست !</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
