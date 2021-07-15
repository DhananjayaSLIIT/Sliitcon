/* eslint-disable no-unused-vars */
import React ,{useState, useEffect , Component} from 'react';
import axios from 'axios';
import header from '../../img/header.png'
import '../../css/header.css'
import NormalNavbar from'../Navbar/NormalNavbar'

export default class HeaderNormal extends Component {

render (){
    
    return (
        <div>
        <header id="header">
            <nav>
                     <div className="header-center">
                        <img className="img-header" src={header} alt="Logo" /> 
                        <button className="btn-header"><a href="/registerpopup">Register</a></button>                
                        <button className="btn-header"><a href="/loginpopup">Login</a></button>                  
                    </div>
            </nav>
        </header>
        <NormalNavbar/>
        </div>
        
        );
}

}

