import { useState, useEffect } from "react";
import styles from '../styles/homes.module.css';
// import style from "../styles/index.module.css";
// import Modal from "./Modal";
import { TextField } from "@mui/material";
import { useMoralis } from "react-moralis";
import Navbar from "../component/Navbar";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 
// import { doc, setDoc } from "firebase/firestore";
// import PhoneLogin from "./phone-login";
import { MoralisProvider } from "react-moralis";
import { app } from "./firebase";
const Form = () => {
        const firebaseConfig = {
            apiKey: "AIzaSyDhbHCdWM7Y4PttG5iBB4DW_2TtODDiOHw",
            authDomain: "medi-doc-1e5cc.firebaseapp.com",
            projectId: "medi-doc-1e5cc",
            storageBucket: "medi-doc-1e5cc.appspot.com",
            messagingSenderId: "1046832478746",
            appId: "1:1046832478746:web:7357989e618e78003dafa3",
            measurementId: "G-SDV38PMCRL"
        };
        
        // Initialize Firebase
        
        const db = getFirestore(app);
        // const [state, setState] = useState("loading (4 sec)...");
        const [mounted, setMounted] = useState(true);
        const { Moralis } = useMoralis();

    const [formValues, setFormValues] = useState([
        { fieldName: "FirstName", fieldValue: "", idValue: "metadataFirstName" },
        { fieldName: "LastName", fieldValue: "", idValue: "metadataLastName" },
        { fieldName: "UID No.", fieldValue: "", idValue: "metadataUID" },
        { fieldName: "Phone no.", fieldValue: "", idValue: "metadatano" },
        { fieldName: "Age", fieldValue: "", idValue:"metadataAge" },
        { fieldName: "Blood_Group", fieldValue: "", idValue:"metadataBloodGroup" },
        { fieldName: "Gender", fieldValue: "", idValue: "metadataGender" },
        { fieldName: "Disease", fieldValue: [], idValue: "metadataDisease" }
    ])
        
        let handleChange = (i, e) => {
            let newFormValues = [...formValues];
            newFormValues[i]["fieldName"] = e.target.name;
            newFormValues[i]["fieldValue"] = e.target.value;
            setFormValues(newFormValues);
        }

       
        const object={
            "key":"value"
        }
        const url=[];
        let uploadMetadata=async(testVariable)=>{
            const firstName=document.getElementById('metadataFirstName').value;
            const lastName=document.getElementById('metadataLastName').value;
            const uid=document.getElementById('metadataUID').value;
            const age=document.getElementById('metadataAge').value;
            const bloodGroup=document.getElementById('metadataBloodGroup').value;
            const gender=document.getElementById('metadataGender').value;
            const phonee=document.getElementById('metadatano').value;
            const disease=document.getElementById('metadataDisease').value;


            const metadata={
                "firstName": firstName,
                "lastName": lastName,
                "uid":uid,
                "age":age,
                "bloodGroup":bloodGroup,
                "gender":gender,
                "phone":phonee,
                "disease":disease,
            }

            console.log(metadata);
            const file=new Moralis.File("file.json", {base64:Buffer.from(JSON.stringify(metadata)).toString('base64')});
            await file.saveIPFS();
            console.log("Done!")
            console.log(file.ipfs());
            url.push(file.ipfs());
        }
        let handleSubmit = async event => {
            event.preventDefault();
            setMounted(!mounted);
            alert("Submitted");
            await uploadMetadata("test object");
            try {
                    const docRef = await addDoc(collection(db, "users"), {
                    IPFS: url,
                    firstName:document.getElementById('metadataFirstName').value,
                    lastName:document.getElementById('metadataLastName').value,
                    Uid: document.getElementById('metadataUID').value,
                    phone:document.getElementById('metadatano').value
                });
                console.log("Document written with ID: ", docRef.id);
              } catch (error) {
                console.log("Error adding document: ", error);
              }
        }
       
    return (
        <>
           <Navbar/>
               <div className={styles.container}>
                    <form onSubmit={handleSubmit}>
                        <div>
                         {formValues.map((element, index) => (
                            <TextField className={styles.label}  id={element.idValue} label={element.fieldName} onChange={e => handleChange(index, e)} variant="outlined" />
                         ))}
                        </div>
                        <div className={styles.button_section}>
                           <button className={styles.add} type="button" onClick={() => addFormFields()}>Add a field</button>
                           <button className={styles.submit} type="submit">Submit</button>
                        </div>
                    </form>
            </div>
            </>
        )
        

}

export default Form