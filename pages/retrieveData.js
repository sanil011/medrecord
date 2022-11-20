// const TableData =  fetch(`https://ipfs.moralis.io:2053/ipfs/QmNbQfmG5iqnzVdGN6fRAKPaY6Gn9nVe8LunAmXH6P9tzE`);
import { ClassNames } from "@emotion/react";
import React, { useContext,useEffect } from "react";
import { collection, query,  getDocs, getFirestore } from "firebase/firestore";
import { app } from "./firebase";
import Image from "next/image";
import Profile from './Images/profile.svg'
import { Context } from './_app';
import Link from "next/link";
import Navbar from "../component/Navbar";
const RetrieveData = () => {
  const {value , setValue,setIpfs,ipfs} = useContext(Context)
  let datas = [];
  useEffect( () => {
    fetchData();
    console.log(value)
  },[])
    const fetchData =  () => {
    const db = getFirestore(app);
    const q = query(collection(db, "users"));
    getDocs(q).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        datas.push({...doc.data(),id:doc.id})
      })
      setValue(datas)
      }).catch((e)=>{console.log(e.message)})
  }
  
  return (
    <>
      <Navbar/>
      <div className="flex pt-16 px-8">
        {console.log(ipfs)}
        {value && value.map((data) => (
          <div className=" w-80 m-4  text-lg" onClick={() => setIpfs((data.IPFS[0]).substr(34))} >
            <Link href='/tb'>
             <Image src={Profile} /></Link>
             <h1  className="pl-4">Uid Number: { data.Uid}</h1>
             <h1 className="pl-4">Phone No: {data.phone}</h1>
        </div>
      ))}
      </div>
    </>
  )
}
// ()
export default RetrieveData
  
