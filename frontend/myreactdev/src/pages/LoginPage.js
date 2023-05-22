import React, { useState } from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import './PagesStyle.css';

export default function LoginPage(){
 
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
   
    const navigate = useNavigate();
     
    const logInUser = () => {
        if(email.length === 0){
          alert("Email has left Blank!");
        }
        else if(password.length === 0){
          alert("password has left Blank!");
        }
        else{
            axios.post('http://127.0.0.1:5000/login', {
                email: email,
                password: password
            })
            .then(function (response) {
                console.log(response);
                //console.log(response.data);
                navigate("/projects");
            })
            .catch(function (error) {
                console.log(error, 'error');
                if (error.response.status === 401) {
                    alert("Invalid credentials");
                }
            });
        }
    }
     
  return (
    <div className="container">
      <form>
        <h2>Log Into Your Account</h2>

        <div className="form-outline mb-4">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="form3Example3" className="form-control form-control-lg" placeholder="Enter your email" />
          <label className="form-label" htmlFor="form3Example3"></label>
        </div>

        <div className="form-outline mb-3">
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="form3Example4" className="form-control form-control-lg" placeholder="Enter password" />
          <label className="form-label" htmlFor="form3Example4"></label>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <div className="form-check mb-0">
            <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
            <label className="form-check-label" htmlFor="form2Example3">
              Remember me
            </label>
          </div>
        </div>

        <div className="text-center text-lg-start mt-4 pt-2">
          <button type="button" className="btn btn-primary btn-lg" onClick={logInUser} >Login</button>
          <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/register" className="link-danger">Register</a></p>
        </div>
      </form>
    </div>
  );
}
