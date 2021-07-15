/* eslint-disable no-unused-vars */
import React, {useState, useEffect,Component} from 'react';
import axios from 'axios';
import header from '../../img/header.png'
import '../../css/header.css'
import {Redirect, withRouter} from 'react-router-dom';
import WorkShopNavbar from '../Navbar/WorkShopNavbar';

const HeaderWorkshop = ({ history}) => {

    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState("");

    useEffect(() => {
        if(!localStorage.getItem("workshopToken")){
            history.push('/loginpopup')
        }
    

    const fetchPrivateData = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("workshopToken")}`
            }
        }

        try {
            const {data} = await axios.get("http://localhost:5000/workshop", config);
            
        } catch (error) {
            localStorage.removeItem("workshopToken");
            history.push('/loginpopup')
        }
    }

    fetchPrivateData();
}, [ history ]);   

const workshopLogoutHandler = () =>{
    localStorage.removeItem("workshopToken");
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
                <button className="btn-header" style={{'marginRight':'60px'}} onClick={workshopLogoutHandler} >Logout</button>                
            </div>
    </nav>
</header>
</div>
<WorkShopNavbar/>
</>
);
};

export default withRouter(HeaderWorkshop);