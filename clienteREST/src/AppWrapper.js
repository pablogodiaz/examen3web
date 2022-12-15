import {
  GoogleOAuthProvider,
  GoogleLogin,
  googleLogout,
} from "@react-oauth/google";
import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import Image from "react-bootstrap/Image";
import jwtDecode from "jwt-decode";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";

export const Wrapper = () => {
  const CLIENT_ID =
    "48605147423-2svm150uchjseq5kvekucr264f0l3pk2.apps.googleusercontent.com";
  const GoogleAuth = () => {
    const [profile, setProfile] = useState(
      JSON.parse(localStorage.getItem("profile"))
    );
    const onSuccess = ({ credential }) => {
      const data = jwtDecode(credential);
      setProfile(data);
      localStorage.setItem("profile", JSON.stringify(data));
    };
    const onFailure = err => {
      console.log("failed:", err);
    };
    const onLogOut = () => {
      setProfile(null);
      localStorage.removeItem("profile");
      googleLogout();
    };

    return profile ? (
      <Row className="align-items-center">
        <Col>
          <Link to={"/profile"}>
            <Image
              className="rounded-circle"
              src={profile.picture}
              alt="user profile"
              width={32}
              height={32}
            />
          </Link>
        </Col>
        <Col>
          <p className="m-0">{profile.email}</p>
          <Button className="m-0" size="sm" variant="danger" onClick={onLogOut}>
            Cerrar sesión
          </Button>
        </Col>
      </Row>
    ) : (
      <GoogleLogin
        clientId={CLIENT_ID}
        buttonText="Sign in with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
        auto_select={true}
      />
    );
  };

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <Outlet />
    </GoogleOAuthProvider>
  );
};
