import React, { } from "react";
import {Link} from 'react-router-dom';
import './PagesStyle.css';
 

export default function LandingPage(){
 
  return (
    <div>
        <div className="container h-100">
            <div className="row h-100">
                <div className="col-12">
                    <h1>Welcome to GE_FullStackDev</h1>
                    <p><Link to="/login"><button type="button" className="btn btn-primary btn-lg">Login</button></Link> | <Link to="/register"><button type="button" className="btn btn-primary btn-lg">Register</button></Link></p>
                    <div className="text-center text-lg-start mt-4 pt-2">
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
 
