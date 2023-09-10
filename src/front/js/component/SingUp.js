
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

function singUp() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function creat_user(event) {
		event.preventDefault()
		console.log(email, "Email", password, "Password");
		try {
			const opts = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: email,
					password: password,
				})
			};
			const resp = await fetch(process.env.BACKEND_URL + "api/signup", opts);


			if (resp.ok) {
              alert("Registro exitoso")
			  navigate("/Login")		 
			  return await resp.json();
			 
			}
			
			
			else alert("There has been some error");

		} catch (error) {
			console.error("There was an Error!!!", error);
		};
	};
	return (<div >

		<div className="col-3 mx-auto my-5">

			<form onSubmit={creat_user} className="bg-secondary rounded p-5">
				<h2>SingUp</h2>
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
				</div	>

				<button type="submit" className="btn btn-primary w-100"

				>SingUp</button>
			</form>
		</div>
	</div>

	)

}

export default singUp;