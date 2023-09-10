import React,{useContext} from "react";
//import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";



	   
export const Navbar = () => {
	
	const { actions, store } = useContext(Context)
	const navigate = useNavigate();
	const handleLogOut = () => {
		actions.logOut();
		navigate("/")
	  }
	return (

		<div className="" >

			<nav className="navbar navbar-expand-lg bg-dark navbar-dark">
				<div className="container-fluid">
					<button type="button" onClick={handleLogOut}className="btn btn-primary w-100"

					>Logout</button>




				</div>
			</nav>
		</div>

	);
};
