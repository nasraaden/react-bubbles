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
    <div className="login-container">
      <h1>Welcome to the Bubble App!</h1>
      <div className="login-form">
        <form onSubmit={submitForm}>
          <label>
            username:  
            <input type="text" name="username" onChange={handleChanges} 
            value={credentials.username}/>
          </label>
          <label>
            password:  
            <input type="password" name="password" onChange={handleChanges} 
            value={credentials.password}/>
          </label>
            <button type="submit">login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
