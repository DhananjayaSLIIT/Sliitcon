/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, {Component,useState, useEffect} from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import logo from '../../img/register.png'
import HeaderAdmin from '../Header/HeaderAdmin';
import Footer from '../Footer/Footer'

export default class AdminEdit extends Component{

constructor(props){
    super(props);

    this.state = {
        adminName:"",
        adminEmail:""

    }
}

handleInputChange = (e) => {
    const {name, value} = e.target;

    this.setState({
        ...this.state,
        [name]: value
    })
    
}

componentDidMount(){
    const id = this.props.match.params.id;

    axios.get(`http://localhost:5000/admin/admindata/${id}`).then((res) =>{
        if(res.data.success){
            this.setState({
                adminName: res.data.admin.adminName,
                adminEmail: res.data.admin.adminEmail,

            });
            
        }
    })
}

onSubmit = (e) => {
    e.preventDefault();

    const id = this.props.match.params.id
    const { adminName, adminEmail}= this.state;
        
    const data = {
        adminName: adminName, 
        adminEmail: adminEmail,
    }
    axios.put(`http://localhost:5000/admin/updateadmin/${id}`, data).then((res) =>{
        if(res.data.success){
            alert("Updated successfully");
            this.setState(
                {   
                    adminName:"",
                    adminEmail:"",
                }
            )
        }
    })
    this.props.history.push('/admindetails');
}

render (){
    return (
        <div>
            <HeaderAdmin/>
            <main id="register">
                <div className="register-container">
                    <form id="formid" method="POST">
                        <div className="form">
        
        
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    id="adminName" 
                                    value={this.state.adminName} 
                                    onChange={this.handleInputChange}
                                    name="adminName" 
                                    placeholder="Enter name"
                                    required/>
                            </div><hr/>
        
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    id="adminEmail" 
                                    value={this.state.adminEmail} 
                                    onChange={this.handleInputChange}
                                    name="adminEmail" 
                                    placeholder="Enter email"
                                    required/>
                            </div><hr/>         
        
                            <div className="form-group">
                                <button type="submit" onClick={this.onSubmit} className="form-btn submit">Update</button>
                            </div>
        
                        </div>
                    </form>
                </div>
            </main>
            <Footer/>
        </div> 
        
        );
}

}


