// const TableData =  fetch(`https://ipfs.moralis.io:2053/ipfs/QmNbQfmG5iqnzVdGN6fRAKPaY6Gn9nVe8LunAmXH6P9tzE`);
import Fuse from 'fuse.js';
import React, { useContext,useEffect,useState } from "react";
import Image from "next/image";
import Profile from './Images/profile.svg'
import { Context } from './_app';
import Link from "next/link";
import Navbar from "../component/Navbar";
import { TextField } from "@mui/material";


const RetrieveData = () => {
  const {value ,setIpfs} = useContext(Context)
  let datas = [];
  const [query, setQuery] = useState('');
    const fuse = new Fuse(value, {
        keys: [
            'uid',
            'phone'
        ]
    })
  const results = fuse.search(query);
    const dataResult = query ? results.map(data => data.item) : value;

    function onSearch({ currentTarget }) {
    setQuery(currentTarget.value);
    }
  return (
    <>
      <Navbar />
      <form className="  text-center pt-8">
              <TextField type="text" label="Search" value={query}  onChange={onSearch}/>
          </form>
      <div className="flex pt-16 px-8 ">
        {dataResult && dataResult.map((data) => (
          <div className=" w-[20%] m-4 bg-slate-200 rounded-md p-4 text-center text-lg" onClick={() => setIpfs((data.IPFS[0]).substr(34))} >
           <Link href='/tb'><div className=" cursor-pointer"> 
             <Image src={Profile} width={80} height={80} /></div></Link>
             <h1  className="pl-4">Uid Number: {data.Uid}</h1>
             <h1 className="pl-4">Phone No: {data.phone}</h1>
        </div>
      ))}
      </div>
    </>
  )
}

export default RetrieveData
  
