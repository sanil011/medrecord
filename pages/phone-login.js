import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { authentication } from "./firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

import {Routes, Route, useNavigate, Navigate, unstable_HistoryRouter} from 'react-router-dom';
import Doctor from "./Doctor";
import { Hidden } from "@mui/material";

export default class PhoneLogin extends Component {
  
  constructor() {
    
    super();
    this.state = {
      isDisabled: true,
      form: true,
      alert: false,
      isVisible:Hidden,
    
    };
  }
 
  onChangeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      
    });
    
  };

  setUpRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('reCAPTCHA-conatainer', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
    
      }
    }, authentication);
  };

  onSignInSubmit = (e) => {
    e.preventDefault();
    this.setUpRecaptcha();
    let phoneNumber = "+91" + this.state.mobile;
    console.log(phoneNumber);
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
      .then(function (confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // console.log(confirmationResult);
        console.log("OTP is sent");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  onSubmitOtp = (e) => {
   
    e.preventDefault();
    let otpInput = this.state.otp;
    let confirmationResult = window.confirmationResult;

    // console.log(codee);
    confirmationResult.confirm(otpInput).then((result) => {
      // User signed in successfully.
      const user = result.user;
     
      console.log("suceesful");
      
      this.setState({
        isDisabled: false,
        
      });
      // ...
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      // ...
    });
  };

  render() {
    
    return (
      <div>
        <Container fluid="sm" className="mt-3">
          <Row className="justify-content-center">
            <Col xs={12} md={6} lg={5}>
              <h2 className="mb-3">Login</h2>
              <Form className="form" onSubmit={this.onSignInSubmit}>
                <div id="recaptcha-container"></div>
                <Form.Group>
                  <Form.Control
                    type="number"
                    name="mobile"
                    placeholder="Mobile Number"
                    onChange={this.onChangeHandler}
                    required
                  />
                </Form.Group>
               

              </Form>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs={12} md={6} lg={5}>
              <h2 className="mb-3">Enter OTP</h2>
              <Form className="form" onSubmit={this.onSubmitOtp}>
                <Form.Group>
                  <Form.Control
                    id="otp"
                    type="number"
                    name="otp"
                    placeholder="OTP"
                    onChange={this.onChangeHandler}
                  />
                </Form.Group>
                
              </Form>
              
              <a href="/tb">
                <button disabled={this.state.isDisabled} >
                 Verified
               </button></a>
            </Col>
          </Row>
         <div id="reCAPTCHA-conatainer"> </div>
        </Container>
        
      </div>
    );
   
  }
  
}
