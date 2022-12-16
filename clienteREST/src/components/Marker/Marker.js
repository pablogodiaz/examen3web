import React from "react";
import { Popup, Marker } from "react-leaflet";
import { iconBusStop } from "./markerLeafLet";

const createBusStopPopup = (data) => {
  const {
    codLinea: lineCode,
    nombreLinea: lineName,
    sentido: direction,
    nombreParada: stopName,
  } = data;
  return (
    <Popup>
      <h6>Línea: {`${lineCode} ${lineName}`}</h6>
      <h6>Parada: {stopName}</h6>
      <h6>Sentido: {direction === 1 ? "Ida" : "Vuelta"}</h6>
    </Popup>    
  );
};

export const BusStopMarkers = ({ requestData }) => {
  return (
    <>
      {requestData.map((stop, idx) => {
        const { lat, lon } = stop;
        return (
          <Marker position={[lat, lon]} key={idx} icon={iconBusStop}>
            {createBusStopPopup(stop)}
          </Marker>
        );
      })}
    </>
  );
};
