const getState = ({ getStore, getActions, setStore }) => {
	
	return {
		store: {
			token:localStorage.getItem("token") ?? null,
			info:" "
			               		                                     
		},
		actions: {        
			// Use getActions to call a function within a fuction
			// creat_user: async () =>    {              
                                  
			// 	try {
			// 		const response = await fetch(process.env.BACKEND_URL+"/api/singup",{
			// 		method:"POST",
			// 		body:JSON.stringify(  
			// 			usuario),
			// 		headers:{    
			// 			"content-type":"Aplication/json"      
                         
			// 		}

			// 		})   

			// 		const body = await response.json()    
					
					
					
			// 	} catch (error){
			// 		console.log(error)

			// 	}
					

			// }
			// ,
			create_token: async ( event,email,password) => {
				const store = getStore()
				event.preventDefault()
				try {
					const response = await fetch(process.env.BACKEND_URL +"api/login",{
					method:"POST",
					body:JSON.stringify({
						"email":email,
						"password": password 
					}),
					headers:{
						"content-type":"Application/json"
					}

					})

					 if (response.ok){
					const body = await response.json()
					console.log(body)
					setStore({token:body.token})
					localStorage.setItem("token",body.token)
					console.log("esto es token",store.token)
					
						return true
				}
				} catch (error){

					console.log(error)

					return false
				}

			},

			 get_app: async ()=> {
				
			const store = getStore();
				try {
					const response = await fetch(process.env.BACKEND_URL +"api/private",{
					method:"GET",
					
					headers:{
						Authorization: ` Bearer ${store.token}`,  
					}

					})
					if (response.ok) {
						
						const body = await response.json()
						
						
						console.log("esto es del get private",body)
					    setStore({info:body})
						
						return true			
					}
					console.log("esto es store.info",store.info)
							
				} catch (error){
					console.log("esto es error",store.info)
					console.log(error)
					
				}
			

			 },
			 setToken:  (token)=> {

				setStore({token})



			 },
			 logOut: () => {
				localStorage.removeItem("token");
				setStore({ token: null })
			},

		}
	};
};

export default getState;
