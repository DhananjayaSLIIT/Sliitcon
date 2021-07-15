/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, {Component,useState, useEffect} from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import logo from '../../img/register.png'
import HeaderWorkshop from '../Header/HeaderWorkshop';
import Footer from '../Footer/Footer';

export default class WorkshopDataEdit extends Component{

constructor(props){
    super(props);

    this.state = {
        workShopTitle:"",
        workShopName:"",
        workShopEmail:"",
        workShopPhone:"",
        workShopDescription:"",

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

    axios.get(`http://localhost:5000/workshop/workshopdata/${localStorage.getItem('workShopId')}`).then((res) =>{
        if(res.data.success){
            this.setState({
                workShopTitle: res.data.workshop.workShopTitle,
                workShopName: res.data.workshop.workShopName,
                workShopEmail: res.data.workshop.workShopEmail,
                workShopPhone: res.data.workshop.workShopPhone,
                workShopDescription: res.data.workshop.workShopDescription,

            });
        }
    })
}

onSubmit = (e) => {
    e.preventDefault();

    const id = this.props.match.params.id
    const { workShopTitle, workShopName, workShopEmail, workShopPhone, workShopDescription }= this.state;
    
    if(this.state.workShopPhone.length !== 10){
        setTimeout((err)=>{
            return alert("Invalid Contact Number"); 
        },2000);
    }
    else{
        
    const data = {
        workShopTitle: workShopTitle,
        workShopName: workShopName, 
        workShopEmail: workShopEmail,
        workShopPhone: workShopPhone,
        workShopDescription: workShopDescription
    }
    axios.put(`http://localhost:5000/workshop/updateworkshop/${id}`, data).then((res) =>{
        if(res.data.success){
            alert("Updated successfully");
            this.setState(
                {   
                    workShopTitle:"",
                    workShopName:"",
                    workShopEmail:"",
                    workShopPhone:"",
                    workShopDescription:"",
                }
            )
        }
    })
    }
    this.props.history.push(`/workshopdata/${localStorage.getItem("workShopEmail")}`)
}

render (){
    return (
        <div>
            <HeaderWorkshop/>
            <main id="register">
                <div className="register-container">
                    <form id="formid" method="POST">
                        <div className="form">
        
                            <img className="form-img" src={logo} alt="Logo" />
        
                            <div className="form-group">
                                <label htmlFor="workShopTitle" className="text-dark">Title :</label>
                                <input 
                                    type="text" 
                                    id="workShopTitle" 
                                    value={this.state.workShopTitle} 
                                    onChange={this.handleInputChange}
                                    name="workShopTitle" 
                                    placeholder="Enter work shop title"
                                    required/>
                            </div><hr/>
        
                            <div className="form-group">
                                <label htmlFor="workShopName" className="text-dark">Name :</label>
                                <input 
                                    type="text" 
                                    id="workShopName" 
                                    value={this.state.workShopName} 
                                    onChange={this.handleInputChange}
                                    name="workShopName" 
                                    placeholder="Enter work shop owners name"
                                    required/>
                            </div><hr/>
        
                            <div className="form-group">
                                <label htmlFor="workShopEmail" className="text-dark">Email :</label>
                                <input 
                                    type="text" 
                                    id="workShopEmail" 
                                    value={this.state.workShopEmail} 
                                    onChange={this.handleInputChange}
                                    name="workShopEmail" 
                                    placeholder="Enter email"
                                    required/>
                            </div><hr/>            
        
                            <div className="form-group">
                                <label htmlFor="workShopPhone" className="text-dark">Contact number :</label>
                                <input 
                                    type="text" 
                                    id="workShopPhone" 
                                    value={this.state.workShopPhone} 
                                    onChange={this.handleInputChange} 
                                    name="workShopPhone" 
                                    placeholder="Enter 10 digit contact number"
                                    required/>
                            </div><hr/>  
        
        
                            <div className="form-group">
                                <label htmlFor="workShopDescription"  className="text-dark">Description :</label>
                                <input 
                                    type="text" 
                                    id="workShopDescription" 
                                    value={this.state.workShopDescription} 
                                    onChange={this.handleInputChange}
                                    name="workShopDescription"
                                    placeholder="Enter a small description about your work shop"
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


