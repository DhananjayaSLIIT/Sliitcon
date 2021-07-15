/* eslint-disable no-unused-vars */
import React, {useState, useEffect,Component} from 'react';
import axios from 'axios';
import header from '../../img/header.png'
import '../../css/header.css'
import {Redirect, withRouter} from 'react-router-dom';
import ReviewerNavbar from '../Navbar/ReviewerNavbar';

const HeaderReviewer = ({ history}) => {

    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState("");

    useEffect(() => {
        if(!localStorage.getItem("reviewerToken")){
            history.push('/loginpopup')
        }
    

    const fetchPrivateData = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("reviewerToken")}`
            }
        }

        try {
            const {data} = await axios.get("http://localhost:5000/reviewer", config);
            
        } catch (error) {
            localStorage.removeItem("reviewerToken");
            history.push('/loginpopup')
        }
    }

    fetchPrivateData();
}, [ history ]);   

const reviewerLogoutHandler = () =>{
    localStorage.removeItem("reviewerToken");
    history.push('/');
}


return (
    error ? <span>{error}</span> : <>


<div>
{privateData}
<header id="header">
    <nav>
             
            <div className="header-center">
            <img className="img-header" src={header} alt="Logo" /> 
                <button className="btn-header" style={{'marginRight':'60px'}} onClick={reviewerLogoutHandler} >Logout</button>                
            </div>
    </nav>
</header>
</div>
<ReviewerNavbar/>
</>
);
};

export default withRouter(HeaderReviewer);