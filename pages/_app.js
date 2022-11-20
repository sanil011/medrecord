import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import Navbar from "../component/Navbar";
import React,{useState,createContext} from "react";
import App from "next/app";

export const Context = createContext();
function MyApp({ Component, pageProps }) {
  const [value, setValue] = useState('');
  const [ipfs, setIpfs] = useState('none');
  return (
    
    <Context.Provider value={{value,  setValue ,setIpfs ,ipfs}}>
      <MoralisProvider
      appId="MyFpOagRB5pWdqQ8R56jZU9YJUn5dGP2KAoWAhoi"
      serverUrl="https://ubno5c6vadgi.usemoralis.com:2053/server"
    >
      {/* <Navbar /> */}
      <Component {...pageProps} />
      </MoralisProvider>
    </Context.Provider>

    
  );
}

export default MyApp;