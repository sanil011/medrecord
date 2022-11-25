
import Fuse from 'fuse.js';
import React, { useContext,useEffect,useState } from "react";
import Image from "next/image";
import Profile from './Images/profile.svg'
import FaceId from './Images/faceid.png';
import Finger from './Images/fingerprint.png';
import { Context } from './_app';
import Link from "next/link";
import Navbar from "../component/Navbar";
import { collection, query,  getDocs, getFirestore,where } from "firebase/firestore";
import { app } from "./firebase";

const RetrieveData = () => {
  const { setIpfs ,setDocValue } = useContext(Context)
  const [value, setValue] = useState('');



  let datas = [];
  const [query1, setQuery] = useState('');

  const dataResult = value ? value : "";
  
  useEffect( () => {
    
  },[])
    const fetchData =  () => {
    const db = getFirestore(app);
    const q = query(collection(db, "users"),where("Uid","==",`${query1}`))
    getDocs(q).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        datas.push({...doc.data(),id:doc.id})
      })
      setValue(datas)
      console.log(datas)
    }).catch((e) => { console.log(e.message) })

  }

  function onSearch(value) {
    setQuery(value);
    console.log(value)
  }
  const handleSearch = () => {
    fetchData();
  }


  return (
    <>
      <Navbar />
      <div className='flex justify-around'>
      <Link href='/emergency'>
          <button className="bg-[#1977F2]  w-[8em] h-[3em] rounded-lg mt-5 text-white cursor-pointer disabled:bg-gray-300  "> <div className='flex justify-between px-2'><Image src={Finger} width={25} height={25} /> <Image src={FaceId} width={25} height={25}/> </div> </button></Link>
          <div className="pt-4 ">
          <input className='border-4 w-[12em] py-2 mx-2' type="text" label="Search" onChange={(e) => onSearch(e.target.value)} />
          <button className="bg-[#1977F2]  px-3 py-2 rounded-lg mt-5 text-white cursor-pointer disabled:bg-gray-300  " onClick={handleSearch}>Search</button>
          </div>
      </div>
      <div className="flex pt-16 px-8 ">
        {dataResult && dataResult.map((data) => (
          <div className=" w-[20%] m-4 bg-slate-200 rounded-md p-4 text-center text-lg" onClick={() => (setIpfs((data.IPFS[0]).substr(34)),setDocValue(data.phone))} >
            <Link href='/docPhone'>
              <div className=" cursor-pointer"> 
              <Image src={Profile} width={80} height={80} />
             </div>
            </Link>
             <h1  className="pl-4">Uid Number: {data.Uid}</h1>
             <h1 className="pl-4">Phone No: {data.phone}</h1>
        </div>
      ))}
      </div>
    </>
  )
}

export default RetrieveData
  
