import Login from "./Login";
import { useMoralis } from "react-moralis";
import Form from "../pages/Homes";
import icon from "../pages/Images/logo.svg"
import Image from "next/image";
import styles from "../styles/index.module.css";
import Doctor from "../pages/Doctor";
import PhoneLogin from "./phone-login";
import React from "react";
import { Route, Routes } from "react-router-dom";
export default function Home() {
  const { isAuthenticated, logout, user } = useMoralis();
 
  return (
    
    <div>
      {isAuthenticated ?
        <div>
          
          <Doctor username={user.get("username")} />
        </div>
        : (
          <Login />
        )}


       
    </div>
  );
}