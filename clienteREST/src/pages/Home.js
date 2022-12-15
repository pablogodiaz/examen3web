import { getExamplesFromUser, deleteExample } from "../api/FetchExamplesFromUser";
import { useEffect, useState } from "react";
import { MDBBtn } from 'mdb-react-ui-kit';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';




export default function Home() {

  const email = "pablogodiaz@uma.es";

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
              <td><button onClick={() => borrar(example.id)} className="btn btn-md btn-success">Borrar</button></td>
            </tr>
          ))}
          
        </tbody>
      </Table>
      <MDBBtn href="/">Actualizar</MDBBtn>
    </>
  );
}