/* eslint-disable no-unused-vars */
import React, {useState, useEffect,Component} from 'react';
import axios from 'axios';
import header from '../../img/header.png'
import '../../css/header.css'
import {Redirect, withRouter} from 'react-router-dom';
import EditorNavbar from '../Navbar/EditorNavbar';

const HeaderEditor = ({ history}) => {

    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState("");

    useEffect(() => {
        if(!localStorage.getItem("editorToken")){
            history.push('/loginpopup')
        }
    

    const fetchPrivateData = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("editorToken")}`
            }
        }

        try {
            const {data} = await axios.get("http://localhost:5000/editor", config);
            
        } catch (error) {
            localStorage.removeItem("editorToken");
            history.push('/loginpopup')
        }
    }

    fetchPrivateData();
}, [ history ]);   

const editorLogoutHandler = () =>{
    localStorage.removeItem("editorToken");
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
                <button className="btn-header" style={{'marginRight':'60px'}} onClick={editorLogoutHandler} >Logout</button>                
            </div>
    </nav>
</header>
</div>
<EditorNavbar/>
</>
);
};

export default withRouter(HeaderEditor);