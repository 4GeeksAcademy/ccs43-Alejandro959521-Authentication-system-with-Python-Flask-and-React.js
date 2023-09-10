import React,{ useContext, useState } from "react";
//import {appContext} from "../store/appContext";
import { BrowserRouter, Route, Routes, Redirect} from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import {Navbar} from "./component/navbar"
import { Home } from "./pages/home";
import injectContext from "./store/appContext";
import Login from "./component/Login";
import SingUp from "./component/SingUp";
import {Private} from "./component/Private";
import { Footer } from "./component/footer";
//import { Context } from "../store/appContext";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;
    // const {actions,store}= useContext(Context)
    // let algo =store.info
    // console.log("esto es info",algo)
    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                 
                    <Routes>
                        <Route element={<Home />} path="/" />
                                             
                        <Route element={<Login/>} path="/Login" />
                        <Route element={<SingUp/>} path="/Singup" />
                        <Route element={<Private/>} path="/Private" />
                        {/* <Route 
                        //  render={()=>{

                        //     store.info ? {<Private/>} : <Redirect to="/Login"/> 
                        //  }
                        //               }/> */}
                        
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
