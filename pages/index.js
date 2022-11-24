import Link from "next/link";
import Image from "next/image";
import React,{useEffect,useContext,useState} from "react";
import Doctor from "./Images/doctor.svg";
import { collection, query,  getDocs, getFirestore } from "firebase/firestore";
import { app } from "./firebase";
import Patient from "./Images/patient.svg";
import { Context } from './_app';

let datas = [];

export default function Home() {
  const { value, setValue, } = useContext(Context)
   const [loading , setLoading] = useState(true)
   useEffect( () => {
    fetchData();
    
  },[])
    const fetchData =  () => {
    const db = getFirestore(app);
    const q = query(collection(db, "users"))
    getDocs(q).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        datas.push({...doc.data(),id:doc.id})
      })
      setValue(datas)
    }).catch((e) => { console.log(e.message) })
      setLoading(false)
  }
 
  return (
    <div className="h-[80vh] relative  bg-[#82BD61]">
     {loading && <div className="absolute top-1/2 left-1/2"> <Image src="/loader.svg" width={50} height={50} /></div>}
      <h1 className="text-3xl font-bold p-4">MediDoc</h1>
      <div className=" flex mt-36 justify-between">
        <div className="flex flex-col pl-56 pt-30">
          <Image width={300} height={300} src={Doctor} />
          <Link href='/doctorlogin'>
            <button className="text-xl bg-[#1977F2] py-3 px-2 rounded-lg text-white ">Login as Doctor</button>
          </Link>
        </div>
        <div className="flex flex-col pr-56 pt-30">
          <Image width={300} height={300} src={Patient} />
          <Link href='/phone-login'>
            <button className="text-xl bg-[#1977F2] py-3 px-2 text-white rounded-lg ">Login as Patient</button>
          </Link>
        </div>

    </div></div>
  );
}