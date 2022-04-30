import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Link, useNavigate } from 'react-router-dom';

import axios from "axios";

import "../styles.css";



function ApplyLeave() {

  // React States

  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);


  const errors = {
    uname: "invalid reason",
    pass: "invalid date"
  };


  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();

    var { reason, date } = document.forms[0];

    axiosCallForUserDetails(reason.value, date.value);


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
          <label>REASON </label>
          <input type="text" name="reason" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>DATE </label>
          <input type="date" name="date" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (


    <div className="login-form">
      <div className="title">Apply for a leave</div>
      {isSubmitted ? <p>Not enough leaves...</p> : renderForm}
    </div>

  );


}



async function axiosCallForUserDetails(reason, date) {
  return new Promise(function (resolve, reject) {

    var data = JSON.stringify({
      "reason": reason
    });

    var config = {
      method: 'post',
      url: 'https://9gxa5cbffj.execute-api.us-east-1.amazonaws.com/default/lms-apply-leave',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        resolve(true);
      })
      .catch(function (error) {
        resolve(false);
      });



  });
}



export default ApplyLeave;
