import React, { useContext, useState } from "react";
import { Context } from './_app';
import Fuse from 'fuse.js';
import Navbar from '../component/Navbar'
import { TextField } from "@mui/material";
const Update = () => {
    const { value } = useContext(Context);
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
    console.log(value)
  return (
      <div className="">
      <Navbar />
      <div className="pt-4 px-4">
         <form className="  text-center">
              <TextField type="text" label="Search" value={query}  onChange={onSearch}/>
          </form>
          <div className="flex pt-16">
          {
            dataResult.map((person, i) => {
              return(<div className='shadow-gray-900 p-4 m-2 rounded-md bg-slate-200' key={i}>
              <h3>Patient - {person.firstName}{ person.lastName}</h3>
              <h2> Phone - {person.phone}</h2>
              </div>)
            })
          }</div></div>
    </div>
  )
}

export default Update