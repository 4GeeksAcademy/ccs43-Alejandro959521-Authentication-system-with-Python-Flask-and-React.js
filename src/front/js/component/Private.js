import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Navbar } from "./navbar";
import { useNavigate } from "react-router-dom";

export const Private = () => {
  const { actions, store } = useContext(Context)
  const navigate = useNavigate();
 // hacer useffect colocar la funciona get app alli, 
 useEffect(() => {
  
  if (store.token == undefined) {
  
  navigate("/")
 } else actions.get_app()
}, [])
  


  return (
    <><Navbar />
   
    <div className="container text-center mt-5">
      Bienvenido {store.info.email}

    </div>
    
    </>
  );
};
