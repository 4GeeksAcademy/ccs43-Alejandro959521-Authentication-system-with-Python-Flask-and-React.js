
import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

function login() {

	const { actions, store } = useContext(Context)
	const navigate = useNavigate()

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const validación = async (event) => {
		event.preventDefault()
		actions.create_token(event, email, password)
		
		//

		let isLogged = await actions.create_token(event, email, password)
		console.log("esto es is logged",isLogged)

		if (isLogged == true) {
				navigate("/Private")
			
		}


		else alert("credenciales invalidas")
	}

	return (

		<div className="col-3 mx-auto my-5">

			<form onSubmit={validación} className="bg-secondary rounded p-5">
				<h2>Please login</h2>
				<div className="my-3">
					<input type="email" className="form-control" placeholder="Email Address" aria-label="Username" aria-describedby="basic-addon1"

						value={email}
						onChange={e => setEmail(e.target.value)}
					/>

				</div>

				<div className="my-3">
					<input type="password" className="form-control" placeholder="Password" aria-label="Username" aria-describedby="basic-addon1"
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</div>
				<button type="submit" className="btn btn-primary w-100"

				>Login</button>
			</form>
		</div>
	)

}
export default login;