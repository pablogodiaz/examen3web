import L from 'leaflet';
import defaultMarker from "../../assets/imgs/map-marker.svg"
import busStopMarker from '../../assets/imgs/busStop-marker.svg';
import busMarker from '../../assets/imgs/bus-marker.svg';

const iconDefault = new L.Icon({
    iconUrl: defaultMarker,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

const iconBusStop = new L.Icon({
    iconUrl: busStopMarker,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

const iconBus = new L.Icon({
    iconUrl: busMarker,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

export { iconDefault, iconBusStop, iconBus };