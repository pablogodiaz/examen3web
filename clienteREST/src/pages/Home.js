import { getExamplesFromUser, deleteExample } from "../api/FetchExamplesFromUser";
import { useEffect, useState } from "react";
import { MDBBtn } from 'mdb-react-ui-kit';
import Table from 'react-bootstrap/Table';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const clientId = "786565206300-nlv7r0d4dnljk6sgoknq9risv476mtca.apps.googleusercontent.com";


export default function DataTable() {

  const navigate = useNavigate();

  var email = ""

  try {
    email = JSON.parse(localStorage.getItem("profile")).email;
  } catch(e) {
    console.log(e)
  }

  const getExamples = async (email) => {
    const examples = await(getExamplesFromUser(email));
    return examples;
  }

  const [examples, setExamples] = useState([
    {
        id: "",
        string: "",
        integer: "",
        float: "",
        email: "",
    }
  ]);

  useEffect(() => {
    const temp = async () => {
      setExamples(await getExamplesFromUser(email))
    }
    temp()
  }, [email]);

  function borrar(id) {
    if(id !== undefined) {
      deleteExample(id);
    }
    navigate(0);
  }

  return (
    <>
      <h1 className="d-flex justify-content-center mt-5"> Ejemplos </h1>
      <Table striped bordered hover className="mt-5">
        <thead>
          <tr>
            <th>String</th>
            <th>Integer</th>
            <th>Float</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Array.from(examples).map(example => (
            <tr key={example.id}>
              <td>{example.string}</td>
              <td>{example.integer}</td>
              <td>{example.float}</td>
              <td><Button onClick={() => borrar(example.id)} className="btn btn-md" variant="danger">Borrar</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="justify-content-align">
        <Button onClick={() => navigate("/create")} className="btn btn-md btn-success">Crear Ejemplo</Button>
      </div>
    </>
  );
}