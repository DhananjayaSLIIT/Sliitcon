/* eslint-disable no-unused-vars */
import React, {useState, useEffect,Component} from 'react';
import axios from 'axios';
import header from '../../img/header.png'
import '../../css/header.css'
import {Redirect, withRouter} from 'react-router-dom';
import AdminNavbar from '../Navbar/AdminNavbar';

const HeaderAdmin = ({ history}) => {

    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState("");

    useEffect(() => {
        if(!localStorage.getItem("adminToken")){
            history.push('/loginpopup')
        }
    

    const fetchPrivateData = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("adminToken")}`
            }
        }

        try {
            const {data} = await axios.get("http://localhost:5000/admin", config);
            
        } catch (error) {
            localStorage.removeItem("adminToken");
            history.push('/loginpopup')
        }
    }

    fetchPrivateData();
}, [ history ]);   

const adminLogoutHandler = () =>{
    localStorage.removeItem("adminToken");
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
                <button className="btn-header" style={{'marginRight':'60px'}} onClick={adminLogoutHandler} >Logout</button>                
            </div>
    </nav>
</header>
</div>
<AdminNavbar/>
</>
);
};

export default withRouter(HeaderAdmin);