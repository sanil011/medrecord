import React, { useContext,useState } from "react";
import { Context } from './_app';
import { authentication } from "./firebase";
import {RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import Navbar from "../component/Navbar";
import Link from "next/link";
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";
import { app } from "./firebase";
import styles from "../styles/Phone.module.css";
import { TextField } from "@mui/material";



let getdt= []

const Phoneverify = () => {
  const [nextButton, setNextButton] = useState(false);
  const { setIpfs} = useContext(Context)

  const [Pn, setPn] = useState();
  const [Otps, setOtps] = useState();
  // const [verify, setVerify] = useState(false);
  // const [otp, setOtp] = useState(true);
  // const [next, setNext] = useState(false);


 const onSignInSubmit = (e) => {
     e.preventDefault();

    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, authentication);
   let phoneNumber = "+91" + Pn;
    
    console.log(phoneNumber);
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
      .then(function (confirmationResult) {
        window.confirmationResult = confirmationResult;
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
      getdt=doc.data();})
      console.log(getdt)
      }).catch((e)=>{console.log(e.message)})
  }
  const onSubmitOtp = (e) => {
    e.preventDefault();
    let otpInput = Otps;
    let confirmationResult = window.confirmationResult;
    confirmationResult.confirm(otpInput).then((result) => {
      const user = result.user;
      setNextButton(true)
      console.log("suceesful");
      setIpfs((getdt.IPFS[0]).substr(34))

    }).catch((error) => {
    });
  };

  const nextHandler = () => {
       
  }


  // console.log((getdt.IPFS[0]).substr(34))
      // setIpfs((getdt.IPFS[0]).substr(34))


  return(
    <>
    <Navbar />
    <div className=" pt-56 text-center">
      <div className="pr-4">

      <TextField sx={{margin:"1em"}}  label="Phone Number" onChange={(e)=>{setPn(e.target.value)}} variant="outlined" />
      <button className="bg-[#1977F2] py-2 px-1 rounded-lg mt-5 text-white cursor-pointer"  onClick={onSignInSubmit } >Get OTP</button>
      </div>
      <div id="recaptcha-container"></div>
      <div className={styles.phoneno}>
      <TextField sx={{margin:"1em"}}   label="OTP" onChange={(e)=>{setOtps(e.target.value)}} variant="outlined" />

      <button className="bg-[#1977F2] py-2 px-1 rounded-lg mt-5 text-white cursor-pointer disabled:bg-gray-300  "   onClick={onSubmitOtp}  >Verify OTP</button>
      </div>
      <div >
     { nextButton &&  <Link href='/tb'>
            <button className="bg-[#71c76b] py-3 px-2 my-2 rounded-lg text-white " onClick={setIpfs((getdt.IPFS[0]).substr(34))}>Next</button>
      </Link>}
     </div>
    </div>
    </>
  )
}

export default Phoneverify

