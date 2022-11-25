import Link from 'next/link';
import Image from "next/image";
import Navbar from '../component/Navbar';

import styles from '../styles/index.module.css'
import Upload from './Images/upload.svg'
import Retrieve from './Images/retrieve.svg'
import Update from './Images/update.svg'


export default function upRet(){
    return(
        <div>
            <Navbar/>
            <div className='flex justify-between  px-28 py-36'>
                <div className='flex flex-col'>
                    <Image src={Upload} width={260} height={290} alt="upload"/>
                <Link href='/Homes'>
                    <button className='mt-16 p-3 w-[80%] text-xl rounded-xl ml-8 bg-gradient-to-r from-[#1746A2] to-[#5F9DF7]'>Upload Data</button>
                </Link>
                </div>
                <div className='flex flex-col mx-12'> 
                    <Image src={Retrieve} width={260} height={290} alt="upload"/>
                    <Link href='/retrieveData'>
                    <button className='mt-16 p-3 w-[80%] text-xl rounded-xl ml-8 bg-gradient-to-r from-[#1746A2] to-[#5F9DF7]'>Retrieve Data</button>
                </Link>
                </div>
                <div className='flex flex-col'>
                    <Image src={Upload} width={260} height={290} alt="upload" />
                    <Link href='/Update'>
                    <button className='mt-16 p-3 w-[80%] text-xl rounded-xl ml-8 bg-gradient-to-r from-[#1746A2] to-[#5F9DF7]'>Update Data</button>
                    </Link>
                </div>
                
            </div>
          
          
        </div>
    )
}