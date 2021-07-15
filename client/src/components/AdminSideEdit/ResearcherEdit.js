/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, {Component,useState, useEffect} from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import logo from '../../img/register.png'
import HeaderAdmin from '../Header/HeaderAdmin';
import Footer from '../Footer/Footer'

export default class ResearcherEdit extends Component{

constructor(props){
    super(props);

    this.state = {
        researcherTopic:"",
        researcherName:"",
        researcherEmail:"",
        researcherPhone:"",
        researcherQualifications:"",

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

    axios.get(`http://localhost:5000/researcher/researcherdata/${id}`).then((res) =>{
        if(res.data.success){
            this.setState({
                researcherTopic: res.data.researcher.researcherTopic,
                researcherName: res.data.researcher.researcherName,
                researcherEmail: res.data.researcher.researcherEmail,
                researcherPhone: res.data.researcher.researcherPhone,
                researcherQualifications: res.data.researcher.researcherQualifications,

            });
            console.log(this.state.researcherdata)
        }
    })
}

onSubmit = (e) => {
    e.preventDefault();

    const id = this.props.match.params.id
    const { researcherTopic, researcherName, researcherEmail, researcherPhone,researcherQualifications }= this.state;
    
    if(this.state.researcherPhone.length !== 10){
        setTimeout((err)=>{
            return alert("Invalid Contact Number"); 
        },2000);
    }
    else{
        
    const data = {
        researcherTopic: researcherTopic,
        researcherName: researcherName, 
        researcherEmail: researcherEmail,
        researcherPhone: researcherPhone,
        researcherQualifications: researcherQualifications
    }
    axios.put(`http://localhost:5000/researcher/updateresearcher/${id}`, data).then((res) =>{
        if(res.data.success){
            alert("Updated successfully");
            this.setState(
                {   
                    researcherTopic:"",
                    researcherName:"",
                    researcherEmail:"",
                    researcherPhone:"",
                    researcherQualifications:"",
                }
            )
        }
    })
    }
    this.props.history.push('/researcherdetails');
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
                                <label htmlFor="researcherTopic" className="text-dark">Topic :</label>
                                <input 
                                    type="text" 
                                    id="researcherTopic" 
                                    value={this.state.researcherTopic} 
                                    onChange={this.handleInputChange}
                                    name="researcherTopic" 
                                    placeholder="Enter Research Topic"
                                    required/>
                            </div><hr/>
        
                            <div className="form-group">
                                <label htmlFor="researcherName" className="text-dark">Name :</label>
                                <input 
                                    type="text" 
                                    id="researcherName" 
                                    value={this.state.researcherName} 
                                    onChange={this.handleInputChange}
                                    name="researcherName" 
                                    placeholder="Enter name"
                                    required/>
                            </div><hr/>
        
                            <div className="form-group">
                                <label htmlFor="researcherEmail" className="text-dark">Email :</label>
                                <input 
                                    type="text" 
                                    id="researcherEmail" 
                                    value={this.state.researcherEmail} 
                                    onChange={this.handleInputChange}
                                    name="researcherEmail" 
                                    placeholder="Enter email"
                                    required/>
                            </div><hr/>            
        
                            <div className="form-group">
                                <label htmlFor="researcherPhone" className="text-dark">Contact number :</label>
                                <input 
                                    type="text" 
                                    id="researcherPhone" 
                                    value={this.state.researcherPhone} 
                                    onChange={this.handleInputChange} 
                                    name="researcherPhone" 
                                    placeholder="Enter 10 digit contact number"
                                    required/>
                            </div><hr/>  
        
        
                            <div className="form-group">
                                <label htmlFor="researcherQualifications"  className="text-dark">Qualifications :</label>
                                <input 
                                    type="text" 
                                    id="researcherQualifications" 
                                    value={this.state.researcherQualifications} 
                                    onChange={this.handleInputChange}
                                    name="researcherQualifications"
                                    placeholder="Enter Qualification Details"
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


