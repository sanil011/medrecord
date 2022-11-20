import Link from 'next/link';
import Image from "next/image";
import Navbar from '../component/Navbar';
import styles from '../styles/upRet.module.css';

import Upload from './Images/upload.svg'
import Retrieve from './Images/retrieve.svg'
export default function upRet(){
    return(
        <div>
            <Navbar/>
            <div className='flex justify-center py-36'>
                <div className='flex flex-col'>
                    <Image src={Upload} width={360} height={290} alt="upload"/>
                <Link href='/Homes'>
                    <button className='mt-16 p-3 w-[80%] text-xl rounded-xl ml-8 bg-gradient-to-r from-[#1746A2] to-[#5F9DF7]'>Upload Data</button>
                </Link>
                </div>
                <div className='flex flex-col mx-12'> 
                    <Image src={Retrieve} width={360} height={290} alt="upload"/>
                    <Link href='/retrieveData'>
                    <button className='mt-16 p-3 w-[80%] text-xl rounded-xl ml-8 bg-gradient-to-r from-[#1746A2] to-[#5F9DF7]'>Retrieve Data</button>
                </Link>
            </div>
            </div>
        </div>
    )
}