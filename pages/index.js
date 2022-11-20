import Link from "next/link";
import Image from "next/image";
import React from "react";
import Doctor from "./Images/doctor.svg";
import Patient from "./Images/patient.svg";
export default function Home() {

 
  return (
    <div className="h-[80vh] bg-[#82BD61]">
      <h1 className="text-4xl font-bold p-4">MediDoc</h1>
      <div className=" flex  justify-between">
        <div className="flex flex-col pl-56 pt-40">
          <Image width={400} height={400} src={Doctor} />
          <Link href='/doctorlogin'>
            <button className="text-2xl bg-[#1977F2] py-3 px-2 rounded-lg text-white ">Login as Doctor</button>
          </Link>
        </div>
        <div className="flex flex-col pr-56 pt-40">
          <Image width={400} height={400} src={Patient} />
          <Link href='/phone-login'>
            <button className="text-2xl bg-[#1977F2] py-3 px-2 text-white rounded-lg ">Login as Patient</button>
          </Link>
        </div>

    </div></div>
  );
}