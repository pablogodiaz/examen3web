import { getParadasLineaSentido } from "../api/FetchParadas";
import { useEffect, useState } from "react";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useMap } from "react-leaflet";
import { MDBRow } from "mdb-react-ui-kit";
import { MDBCol } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import { BusStopMarkers } from "../components/Marker/Marker";


export default function DataTable() {

  const navigate = useNavigate();

  const [form, setForm] = useState({});
  const setField = (field, value) => {
      setForm({
          ...form,
          [field]:value
      })
  }

  var paradas = useState([{
    // Aqui deberia de coger solo los atributos lon y lat para mostrar las
    // paradas correspondientes en el mapa, pero no me ha dado tiempo. Para que el codigo funcione y la vista
    // se muestre debe quitar la linea 100, donde pone BusStopMarkers.
      lon: "",
      lat: "",
  }]);

  function mostrarLinea() {
    paradas = getParadasLineaSentido(form.codLinea, form.sentido);
    navigate(0);
  }


  const latlngMalaga = {
    lat: 36.719444,
    lng: -4.42000,
  };

  const MyMap = ({ position }) => {
    const map = useMap();
    useEffect(() => {
      //Center map on position
      map.flyTo([position.lat, position.lng]);
    }, [position, map]);
  
    return null;
  };


  return (
    <>
      <h1 className="d-flex justify-content-center mt-5"> Ejemplos </h1>
      <MDBRow>
        <MDBCol>
          <MDBCol>
          <Form className="list-group mb-3 d-flex">
            <MDBCol>
                <MDBRow className="list-group-item d-flex justify-content-between lh-sm">
                    <Form.Group className="mw-25" controlId="integer">
                        <Form.Label >Cogido de Linea:</Form.Label>
                        <Form.Control className="mt-3" type="number" placeholder="Codigo de linea"
                        value={form.codLinea}
                        onChange={(e) => setField("codLinea", e.target.value)} />
                    </Form.Group>                            
                </MDBRow>
                <MDBRow className="list-group-item d-flex justify-content-between lh-sm">
                    <Form.Group className="mw-25" controlId="integer">
                        <Form.Label >Sentido:</Form.Label>
                        <Form.Control className="mt-3" type="number" placeholder="Sentido"
                        value={form.sentido}
                        onChange={(e) => setField("sentido", e.target.value)} />
                    </Form.Group>                            
                </MDBRow>
                <MDBRow className="list-group-item d-flex justify-content-between lh-sm">
                    <Button onClick={() => mostrarLinea()}>Mostrar Linea</Button>
                </MDBRow>
            </MDBCol>
        </Form>
          </MDBCol>
          <MapContainer
            className="rounded-5 justify-content-center"
            style={{
              height: "400px",
              width: "600px",
            }}
            center={latlngMalaga}
            zoom={13}
            scrollWheelZoom={false} >
            <MyMap position={latlngMalaga} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
        </MDBCol>
      </MDBRow>
    </>
  );
}