import React from "react";

import { Link } from "react-router-dom";

import "../../styles/home.css";

export const Home = () => {
	

	return (
		<div className="text-center mt-5">
			<Link to="/Login">
			<button type="button" className="btn btn-primary">Login</button>
			</Link>
			<Link to="/Singup">
			<button type="button" className="btn btn-secondary">Singup</button>
			</Link>
		</div>
	);
};
