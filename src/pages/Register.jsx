import React,{ useState } from'react'
import Add from "../img/addAvatar.png"
import {  createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from '../Firebase';
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const[err, setErr] = useState(false);
    const navigate = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

 try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        
        const storageRef = ref(storage, displayName);

        const uploadTask = uploadBytesResumable(storageRef, file);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on(
        (error) => {
           setErr(true);
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
             await updateProfile(res.user,{
                displayName,
                photoURL:downloadURL,
                });
                await setDoc(doc(db, "users",res.user.uid),{
                    uid : res.user.uid,
                    displayName,
                    email,
                    photoURL: downloadURL,
                   });

                await setDoc(doc(db, "userChats", res.user.uid),{});
                navigate("/");
                });
            }
          );
        } catch (err) {
            setErr(true);
        }   
    };

    return (
        <div className='formContainer'>
            <div className='formWrapper'>
                <span className="logo" >TalkItOut</span>
                <span className="logo">Register</span>
            <form onSubmit={handleSubmit}>
                <input type= "text" placeholder= "Display name" />
                <input type= "email" placeholder="Enter your email" />
                <input type= "password" placeholder="Enter a password" />
                <input style={{display:"none"}} type= "file" id="file" />
                <label htmlFor="file" >
                    <img src={Add} alt="" />
                    <span>Add a Profile picture</span>
                </label>
                <button>Sign up</button>
                {err && <span>Not everyone is lost, But you sure are</span>}
            </form>
            <p> You do have an account! <Link to="/login "> Login </Link>here </p>
         </div>
      </div>
    )
}


export default Register;



// import React, {useState} from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import {  createUserWithEmailAndPassword  } from 'firebase/auth';
// import { auth } from '../Firebase';
 
// const Register = () => {
//     const navigate = useNavigate();
 
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('');
 
//     const onSubmit = async (e) => {
//       e.preventDefault()
     
//       await createUserWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             // Signed in
//             const user = userCredential.user;
//             console.log(user);
//             navigate("/login")
//             // ...
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             console.log(errorCode, errorMessage);
//             // ..
//         });
 
   
//     }
 
//   return (
//     <main >        
//         <section>
//             <div>
//                 <div>                  
//                     <h1> FocusApp </h1>                                                                            
//                     <form>                                                                                            
//                         <div>
//                             <label htmlFor="email-address">
//                                 Email address
//                             </label>
//                             <input
//                                 type="email"
//                                 label="Email address"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}  
//                                 required                                    
//                                 placeholder="Email address"                                
//                             />
//                         </div>

//                         <div>
//                             <label htmlFor="password">
//                                 Password
//                             </label>
//                             <input
//                                 type="password"
//                                 label="Create password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)} 
//                                 required                                 
//                                 placeholder="Password"              
//                             />
//                         </div>                                             
                        
//                         <button
//                             type="submit" 
//                             onClick={onSubmit}                        
//                         >  
//                             Sign up                                
//                         </button>
                                                                     
//                     </form>
                   
//                     <p>
//                         Already have an account?{' '}
//                         <NavLink to="/login" >
//                             Sign in
//                         </NavLink>
//                     </p>                   
//                 </div>
//             </div>
//         </section>
//     </main>
//   )
// }
 
// export default Register









