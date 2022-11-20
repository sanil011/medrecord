import React, { Component, useEffect ,useContext,useState} from "react";
// import { kdata } from "./tabledata";
import { Context } from './_app';
import axios from "axios";
const Tb = () => {
  const { ipfs } = useContext(Context);
  const [data , setData] = useState()

  useEffect(() => {
    fetchData()
  },[])
  const link = `https://gateway.moralisipfs.com/ipfs/${ipfs}`;
  console.log(link)
  const fetchData = async () => {
    try {
      const response = await axios.get(link)
      setData(response.data)
      // console.log(response.data)
    } catch (error)  {
      console.log(error.message)
    }
  }

  return (
    <div className="flex justify-center pt-56 text-2xl">
    { data && <table className="p-16">
        <tr >
          <td className="p-4 text-3xl">Name - </td>
          <td className="p-4 text-3xl">{data.name}</td>
        </tr>
        <tr >
          <td className="p-4 text-3xl">Age - </td>
          <td className="p-4 text-3xl">{data.age}</td>
        </tr>
        <tr >
          <td className="p-4 text-3xl">Gender - </td>
          <td className="p-4 text-3xl">{data.gender}</td>
        </tr>
        <tr >
          <td className="p-4 text-3xl">Phone - </td>
          <td className="p-4 text-3xl">{data.phone}</td>
          </tr>
          <tr >
          <td className="p-4 text-3xl">UID - </td>
          <td className="p-4 text-3xl">{data.uid}</td>
        </tr>
      </table>}
    </div>
  )
}
export default Tb;