import React from "react";
import { getCommentsFromHousehold } from "../../api/FetchCommentsHousehold";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";


export const Comment = ({ idHousehold }) => { 

    const getComments = async (idHousehold) => {
        const comments = await(getCommentsFromHousehold(idHousehold));
        return comments;
    }

    const [comments, setComments] = useState([
        {
            id: "",
            user: {
                renter_username: "",
                renter_email: "",
            },
            household: {
                id: "",
            },
            text: "",
            rating: "",
        }
    ]);

    useEffect(() => {
        const temp = async () => {
          setComments(await getCommentsFromHousehold(idHousehold))
        }
        temp()
      }, [idHousehold]);


    return (
        <MDBContainer className="mt-3 mb-3" style={{ maxWidth: "1000px" }}>
        <MDBRow className="justify-content-left">
            <MDBCol md="8" lg="8">
            <MDBCard
                className="shadow-0 border"
                style={{ backgroundColor: "#f0f2f5" }}
            >
                <MDBCardBody>
                    <MDBInput wrapperClass="mb-4" placeholder="Escribir comentario..." />
                    {Array.from(comments).map(comment => (
                        <MDBCard className="mb-4">
                            <MDBCardBody>
                            <p>{comment.text}</p>

                            <div className="d-flex justify-content-between">
                                <div className="d-flex flex-row align-items-center">
                                <MDBCardImage
                                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(4).webp"
                                    alt="avatar"
                                    width="25"
                                    height="25"
                                />
                                <p className="small mb-0 ms-2">{comment.user.renter_username}</p>
                                </div>
                            </div>
                            </MDBCardBody>
                        </MDBCard>
                    ))}
                </MDBCardBody>
            </MDBCard>
            </MDBCol>
        </MDBRow>
        </MDBContainer>
    );
};