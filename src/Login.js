import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Link, useNavigate } from 'react-router-dom';

import axios from "axios";

import "./styles.css";



function Login() {

  // React States

  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function axiosCallForToken(uname, pass) {
    return new Promise(function (resolve, reject) {

      setIsLoading(true);

      var data = JSON.stringify({
        "client_id": "Bs1zHv3PZ5i8DN0xy7uIfJ0VPzhKfdGN",
        "client_secret": "jDyn9QbKs4tDXKeGXea29kryHoBUukqlw26wv7pyUN2fxPqGWxVIr0mzz9F4qLPF",
        "audience": "https://auth0-jwt-authorizer/",
        "grant_type": "password",
        "username": "shukla.shi@northeastern.edu",
        "password": "Mars2114737"
      });

      var config = {
        method: 'post',
        url: 'https://dev-tdqeognh.us.auth0.com/oauth/token',
        headers: {
          'content-type': 'application/json'
        },
        data: data
      };

      axios(config)
        .then(function (response) {
          setIsLoading(false);
          resolve(response);
        })
        .catch(function (error) {
          setIsLoading(false);
          resolve(false);
        });


    });
  }


  useEffect(() => {
    axiosCallForToken();
  }, []);


  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };


  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

   // var axiosTokenData = await axiosCallForToken(uname, pass);

    var axiosTokenData = {
      status : 200,
      data : {
        access_token : "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ikp4ZWFlTlJ4Vm8xZjFTQU1sYkszYyJ9.eyJpc3MiOiJodHRwczovL2Rldi10ZHFlb2duaC51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjI2ODcxOTRmZGJiNGUwMDY4Y2JkOTllIiwiYXVkIjoiaHR0cHM6Ly9hdXRoMC1qd3QtYXV0aG9yaXplci8iLCJpYXQiOjE2NTEyNDgyODgsImV4cCI6MTY1MTMzNDY4OCwiYXpwIjoiQnMxekh2M1BaNWk4RE4weHk3dUlmSjBWUHpoS2ZkR04iLCJndHkiOiJwYXNzd29yZCIsInBlcm1pc3Npb25zIjpbXX0.hoHnexLztorm1tu7jStd6zbrhvzOZVt1n-jkoti6v7vY9lO7GbEuvVriyr1JxfQll5bEh7_HMX6fViKsBCgSR0bmrJB9QRuPHimTs1TgfglDX3pzg6Z7hqKZfyIRT3E3cnhNwXHjqwKgTIeL5gIHUeZewjKPQfAatRCuQbmTslnmb_K24GucnF6i7_hwCpx73piSa_LS8mauRoYBfH6e4IHJRmdZmp42762FidOwKSPVIRq6utyIYNQTgK6uVW7LFKXSWAa-dwct9G4pUSB9m1A0IPgwOBRB3bL6gxbSwsyAx26z435TKVGsgL8hDZfNDxCkA_VoqZhHwln3wiLHPA"
      }
    }

    if (axiosTokenData) {
      if (axiosTokenData.status != 200) {
        ;
        setErrorMessages({ name: "login server error", message: axiosTokenData.status + "Cannot login" });
      } else {
        localStorage.setItem('token', axiosTokenData.data.access_token);
        setIsSubmitted(true);
      }
    } else {
      setErrorMessages({ name: "login server error", message: "Cannot login" });
    }

  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (

    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? isLoading ? <p>logging in !!!</p> : <Home /> : renderForm}
      </div>
    </div>
  );


}

function Home() {

  const navigate = useNavigate();

  const [isHavingRole, setisHavingRole] = useState(true);


  const handleSubmitDashboard = async (event) => {

    event.preventDefault();

    // let userData = await axiosCallForUserDetails();

    let userData = {
      data : {
        Items: [
          {
            "approver_emp_no": 0,
            "leaves_rem": 20,
            "role": "approver",
            "emp_email": "shukla.shi@northeastern.edu",
            "auth_id": "auth0|62687194fdbb4e0068cbd99e",
            "leaves_total": 20,
            "emp_name": "Shivam Shukla",
            "emp_no": 2
          }
        ]
      }
    }

    if (userData) {
      localStorage.setItem('user-name', userData.data.Items[0].emp_name);
      localStorage.setItem('user-leaves-rem', userData.data.Items[0].leaves_total);
      localStorage.setItem('user-leaves-total', userData.data.Items[0].leaves_rem);
    } else {
      setisHavingRole(false);
    }


    if (userData.data.Items[0].role == "approver") {
      navigate("/dashboardAdmin", { replace: true });
    } else {
      navigate("/dashboard", { replace: true });
    }

  };

  return (
    <>
      <div>User is successfully logged in</div>

      <br />
      <br />

      {isHavingRole ? <button type="button" onClick={handleSubmitDashboard}>
        Do to the dashboard </button> : <div>Cannot extract role. Please try again later !! </div>
      }

    </>
  );
}


async function axiosCallForUserDetails() {
  return new Promise(function (resolve, reject) {

    var config = {
      method: 'get',
      url: 'https://9gxa5cbffj.execute-api.us-east-1.amazonaws.com/default/user_details',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ikp4ZWFlTlJ4Vm8xZjFTQU1sYkszYyJ9.eyJpc3MiOiJodHRwczovL2Rldi10ZHFlb2duaC51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NjI2ODcxOTRmZGJiNGUwMDY4Y2JkOTllIiwiYXVkIjoiaHR0cHM6Ly9hdXRoMC1qd3QtYXV0aG9yaXplci8iLCJpYXQiOjE2NTEyNDIwNDYsImV4cCI6MTY1MTMyODQ0NiwiYXpwIjoiQnMxekh2M1BaNWk4RE4weHk3dUlmSjBWUHpoS2ZkR04iLCJndHkiOiJwYXNzd29yZCIsInBlcm1pc3Npb25zIjpbXX0.kSo3rzNsoga1n7IZotELu287hkhBAoEbl7m0JN1HOxtHUdyxhIB8sIvPSyrOSqtG6sElokNEB70pe3PFElwBfYKc2etXm1YGiluMzsGwG4QZmei0pPPTgMiFJ5tNKVeikD4aH0o9FTxtQ790w8jf0hIN6khbDE1YfKFEYFTAvCVutAUk4RYFUqdbZG_YP9VCyQxbw9AoPeITlwPfJmODHkCEULAFfvx6biWCw0ZS6k-PrkgV8rUX3UjJXRUITa6aMdcUqoB02doFgixLV6FJQTC262VE2JccfK4gN7cIiBNO5KwaFK-G7TLNl_iPnj9YgTlOEUCeY9nJSRf3CkHNkA'
      }
    };

    axios(config)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        resolve(false);
      });


  });
}



export default Login;
