/* eslint-disable no-unused-vars */
import React, {useState, useEffect,Component} from 'react';
import axios from 'axios';
import header from '../../img/header.png'
import '../../css/header.css'
import {Redirect, withRouter} from 'react-router-dom';
import ResearcherNavbar from '../Navbar/ResearcherNavbar';

const HeaderResearcher = ({ history}) => {

    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState("");

    useEffect(() => {
        if(!localStorage.getItem("researcherToken")){
            history.push('/loginpopup')
        }
    

    const fetchPrivateData = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("researcherToken")}`
            }
        }

        try {
            const {data} = await axios.get("http://localhost:5000/researcher", config);
            
        } catch (error) {
            localStorage.removeItem("researcherToken");
            history.push('/loginpopup')
        }
    }

    fetchPrivateData();
}, [ history ]);   

const researcherLogoutHandler = () =>{
    localStorage.removeItem("researcherToken");
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
                <button className="btn-header" style={{'marginRight':'60px'}} onClick={researcherLogoutHandler} >Logout</button>                
            </div>
    </nav>
</header>
</div>
<ResearcherNavbar/>
</>
);
};

export default withRouter(HeaderResearcher);