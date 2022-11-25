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
import Image from "next/image";
import face from './Images/face.svg'
import finger from './Images/finger.svg'
import {WebcamCapture} from './Webcam'

const Emergency = () => {
    const [emergency, setEmergency] = useState(false);

    const faceHandle = () => {
        setEmergency(true);
    }

    return(
        <>
            <Navbar />
            {emergency ?<div className="flex justify-center pt-44"><WebcamCapture /> </div>  :
                <div className='flex justify-between  px-80 py-36'>
                    <div className='flex flex-col'>
                        <Image src={finger} width={260} height={290} alt="upload" />
                        <Link href='/Homes'>
                            <button className='mt-16 p-3 w-[80%] text-xl rounded-xl ml-8 bg-gradient-to-r from-[#1746A2] to-[#5F9DF7]'>fingerPrint Scan</button>
                        </Link>
                    </div>
                    <div className='flex flex-col mx-12'>
                        <Image src={face} width={260} height={290} alt="upload" />
                        <button className='mt-16 p-3 w-[80%] text-xl rounded-xl ml-8 bg-gradient-to-r from-[#1746A2] to-[#5F9DF7]' onClick={faceHandle} >Face recognizition</button>
                    </div>
               
                
                </div>}
        </>
    )
}
export default Emergency