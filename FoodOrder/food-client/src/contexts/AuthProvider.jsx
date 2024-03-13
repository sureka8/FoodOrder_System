import React, { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);
const googleprovider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //create an account
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const singupwithgmail = () => {
    return signInWithPopup(auth, googleprovider);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //logout
  const logout = () => {
    signOut(auth);
  };
  //update profile
  const updateuserprofile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  //chack sign in user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        setUser(currentUser);
        if(currentUser){
          const userInfo ={email: currentUser.email}
          axios.post('http://localhost:6001/jwt', userInfo)
            .then( (response) => {
              // console.log(response.data.token);
              if(response.data.token){
                  localStorage.setItem("access-token", response.data.token)
              }
            })
      } else{
         localStorage.removeItem("access-token")
      }
        
      } 
    });
    return () => {
      return unsubscribe();
    };
  }, []);


  const authInfo = {
    user,
    createUser,
    singupwithgmail,
    login,
    updateuserprofile,
    logout,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
