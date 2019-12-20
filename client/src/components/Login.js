import React, {useState} from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [credentials, setCredentials] = useState({username: "", password: ""})

  const handleChanges = e => {
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }

  const submitForm = e => {
    e.preventDefault();
    axiosWithAuth().post("/login", credentials)
    .then(res => {
      console.log(res)
      localStorage.setItem("token", res.data.payload)
      props.history.push("/bubbles")
    })
    .catch(err => console.log(err))
  }


  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={submitForm}>
        <input type="text" name="username" placeholder="Username" onChange={handleChanges} 
        value={credentials.username}/>
        <input type="password" name="password" placeholder="Password" onChange={handleChanges} 
        value={credentials.password}/>
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
