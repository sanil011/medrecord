import React, { Component } from "react";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { Context } from './_app';
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { authentication } from "./firebase";
import {getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import Navbar from "../component/Navbar";
import Doctor from "./Doctor";
import { Alert, Hidden, Link } from "@mui/material";
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";
import { app } from "./firebase";
import styles from "../styles/Phone.module.css";

let getdt= []

const Phoneverify=()=>{
  const {setIpfs, ipfs} = useContext(Context)
  const [Pn, setPn] = useState();
  const [Otps, setOtps] = useState();
  // const [Next, setNext] = useState(true);





 
//  const setUpRecaptcha= ()=>{
//     window.recaptchaVerifier = new RecaptchaVerifier('reCAPTCHA-conatainer', {
//       'size': 'invisible',
//       'callback': (response) => {
//         // reCAPTCHA solved, allow signInWithPhoneNumber.
    
//       }
//     }, authentication);
//   };


 const onSignInSubmit = (e) => {
    e.preventDefault();
    
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, authentication);
    let phoneNumber = "+91" + Pn;
    console.log(phoneNumber);
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
      .then(function (confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // console.log(confirmationResult);
        console.log("OTP is sent");
        alert("OTP sent!!");
        fetchData();
      })
      .catch(function (error) {
        console.log(error);
      });
      
  };


 const  fetchData =  () => {
    const db = getFirestore(app);
    const q = query(collection(db, "users"), where("phone", "==", Pn));
    getDocs(q).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        getdt=doc.data();
      })
      console.log(getdt)
     console.log((getdt.IPFS[0]).substr(34))
     setIpfs((getdt.IPFS[0]).substr(34))
    
    }).catch((e)=>{console.log(e.message)})
  }
  const onSubmitOtp = (e) => {
   
    e.preventDefault();
    let otpInput = Otps;
    let confirmationResult = window.confirmationResult;

    // console.log(codee);
    confirmationResult.confirm(otpInput).then((result) => {
      // User signed in successfully.
      const user = result.user;
     
      console.log("suceesful");
   
      console.log(ipfs)
      
      // ...
    }).catch((error) => {
      // User couldn't sign in (bad verification code?)
      // ...
    });
  };



  return(
    <>
    <Navbar />
    <div className={styles.contain}>
      <div className={styles.phoneno}>
      
      <input type="text" placeholder="Mobile Number" id="mobile" name="mobile" className={styles.phoneno} onChange={(e)=>{setPn(e.target.value)}} />
      
      <button className="bg-[#1977F2] py-1 px-1 rounded-lg text-white " onClick={onSignInSubmit} >Get OTP</button>
      </div>
      <div id="recaptcha-container"></div>
      <div className={styles.phoneno}>
      <input type="text" placeholder="OTP" id="otp" name="otp" className={styles.phoneno} onChange={(e)=>{setOtps(e.target.value)}} />
      <button className="bg-[#1977F2] py-1 px-1 rounded-lg text-white " onClick={onSubmitOtp}  >Verify OTP</button>
      </div>
      <div >
      <Link href='/tb'>
        <button  className="bg-[#71c76b] py-1 px-2 my-2 rounded-lg text-white " >Next</button></Link>
      </div>
    </div>
    </>
  )
}

export default Phoneverify

// export default class PhoneLogin extends Component {
  
//   constructor() {
    
//     super();
    
//     this.fetchData();
//     this.state = {
//       isDisabled: true,
//       form: true,
//       alert: false,
//       isVisible:Hidden,
     
    
//     };
//   }
 







//   render() {
    
//     return (

//       <div>
//         <Navbar />
//         <div className='flex justify-center mt-56'>
//         <Container fluid="sm" sx={{width:"40em"}} className="mt-3">
//           <Row className="justify-content-center">
//             <Col xs={12} md={6} lg={5}>
//               <h2 className="mb-3">Login</h2>
//               <Form className="form" sx={{padding:"1em"}} onSubmit={this.onSignInSubmit}>
//                 {/* <div id="recaptcha-container"></div> */}
//                 <Form.Group>
//                   <Form.Control
//                     type="text"
//                       name="mobile"
//                     placeholder="Mobile Number"
//                     onChange={this.onChangeHandler}
//                     required
//                   />
//                 </Form.Group>
               

//               </Form>
//             </Col>
//           </Row>
//           <Row className="justify-content-center">
//             <Col xs={12} md={6} lg={5}>
//               <h2 className="mb-3">Enter OTP</h2>
//               <Form className="form" onSubmit={this.onSubmitOtp}>
//                 <Form.Group>
//                   <Form.Control
//                     id="otp"
//                     type="text"
//                     name="otp"
//                     placeholder="OTP"
//                     onChange={this.onChangeHandler}
//                   />
//                 </Form.Group>
                
//               </Form>
              
//               <a href="/tb">
//                 <button disabled={this.state.isDisabled} >
//                  Verified
//                </button></a>
//             </Col>
//           </Row>
//          <div id="reCAPTCHA-conatainer"> </div>
//         </Container>
//         </div>
//       </div>
//     );
   
//   }
  
// }
