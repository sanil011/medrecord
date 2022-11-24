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
      <div>
          <Navbar />
         <form className="search">
              {/* <label>Search</label> */}
              <TextField type="text" label="Search" value={query}  onChange={onSearch}/>
            {/* <input type="text" value={query} onChange={onSearch} /> */}
          </form>
          <div className="flex ">
          {
              dataResult.map((person, i) =>
              <div className='shadow-gray-400 p-4 m-2  bg-slate-200' key={i}>
              <h3>Patient - {person.firstName}{ person.lastName}</h3>
              <h2> Phone - {person.phone}</h2>
          </div>)
          }</div>
    </div>
  )
}

export default Update