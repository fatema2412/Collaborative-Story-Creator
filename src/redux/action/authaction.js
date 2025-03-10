export const LOGIN_SUCESS = "LOGIN_SUCESS";
export const LOGOUT_SUCESS="LOGOUT_SUCESS"
export const RELOGIN_SUCESS="RELOGIN_SUCESS"

import { createUserWithEmailAndPassword, signOut,signInWithEmailAndPassword,updateProfile } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";

export const LogIn=(email, password, firstName, lastName, navigate)=>{
    return async(dispatch)=>{
    try{
        if (!email || !password) {
            console.error("Email and password are required!");
            alert("All fields are mandatory")
            return;
        }

    const userCredential= await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user;
    console.log(user, "userCredential")
    await updateProfile(user, {
        displayName: `${firstName} ${lastName}`
    });

    const userData = {
        email: user.email,
        fullname: user.displayName,
    };
     dispatch({type:LOGIN_SUCESS,payload:userData})
     navigate("/")

    }
    catch(err){
        alert("Something went wrong while SignUp ,please check your email and password")
       console.log(err,"Error in SignIn with firstNme,LastNme")
    }

    }

}

export const LogOut=(navigate)=>{
    return async(dispatch)=>{
   try{
   await signOut(auth)
   dispatch({type:LOGOUT_SUCESS})
   navigate("/login")
   }
   catch(err){
    console.log("Error in LogOut", err)
   }
    }
}

// {email: 'hatmenj@gmail.com', fullname: 'hatm menjarwa'}

export const ReLogIn=(email,password,navigate)=>{
    return async(dispatch)=>{
        try{
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password,
            );
            const user = userCredential.user;

           
            const userData = {
                email: user.email,
                password:user.password,
                fullName:user.displayName
            };
        
            dispatch({ type:RELOGIN_SUCESS , payload:userData });
            navigate("/");

        }
        catch(err){
            alert("Something went wrong while SignIn")
            console.log("Error in LogIn for user already SignUp",err)
        }
    }
}