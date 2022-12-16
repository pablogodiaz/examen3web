import Container from "react-bootstrap/Container";
import { useState } from "react";
import { MDBRow } from "mdb-react-ui-kit";
import { MDBCol } from "mdb-react-ui-kit";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { v4 as uuid } from 'uuid';
import React from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function CreateHousehold() {

    const navigate = useNavigate();

    const [form, setForm] = useState({});
    const setField = (field, value) => {
        setForm({
            ...form,
            [field]:value
        })
    }

    function createExample() {
        const unique_id = uuid();
        const email = JSON.parse(localStorage.getItem("profile")).email
        const jsonObject = {
            id: unique_id,
            string: form.string,
            integer: form.integer,
            float: form.float,
            email_user: email,
        }
        axios.post("http://pabloexamenweb.ddns.net:8001/examples/", jsonObject);
        navigate("/");
    }

    return (
        <>
            <Container>
                <MDBRow>
                    <Form className="list-group mb-3 d-flex">
                        <MDBCol>
                            <MDBRow className="list-group-item d-flex justify-content-between lh-sm">
                                <Form.Group controlId="string">
                                    <Form.Label className="my-0">String:</Form.Label>
                                    <Form.Control className="mt-3" type="text" placeholder="String"
                                    value={form.string} 
                                    onChange={(e) => setField("string", e.target.value)} />
                                </Form.Group>
                            </MDBRow>
                            <MDBRow className="list-group-item d-flex justify-content-between lh-sm">
                                <Form.Group className="mw-25" controlId="integer">
                                    <Form.Label >Integer:</Form.Label>
                                    <Form.Control className="mt-3" type="number" placeholder="Int number"
                                    value={form.integer}
                                    onChange={(e) => setField("integer", e.target.value)} />
                                </Form.Group>                            
                            </MDBRow>
                            <MDBRow className="list-group-item d-flex justify-content-between lh-sm">
                                <Form.Group className="mw-25" controlId="float">
                                    <Form.Label >Float:</Form.Label>
                                    <Form.Control className="mt-3" type="number" placeholder="Float number"
                                    value={form.float}
                                    onChange={(e) => setField("float", e.target.value)} />
                                </Form.Group>                            
                            </MDBRow>
                            <MDBRow className="list-group-item d-flex justify-content-between lh-sm">
                                <Button onClick={() => createExample()}>Crear Ejemplo</Button>
                            </MDBRow>
                        </MDBCol>
                    </Form>
                </MDBRow>
            </Container>
        </>
    );
}