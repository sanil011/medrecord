import { useMoralis } from "react-moralis";

import React from 'react'
import styles from "../styles/index.module.css";
const Navbar = () => {
  const { isAuthenticated, logout, user } = useMoralis();
    return (
      <>
        <div style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            background: "#76b852", /* fallback for old browsers */
            background: "rgb(141,194,111)",
            background: "linear-gradient(90deg, rgba(141,194,111,1) 0%, rgba(118,184,82,1) 50%)"
          }}>
            <div className={styles.logo}>
              MediDoc
            </div>
            <button className={styles.signout} onClick={logout}>Sign Out</button>
          </div>
    </>
  )
}

export default Navbar

