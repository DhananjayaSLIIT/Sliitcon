/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, {Component,useState, useEffect} from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import logo from '../../img/register.png'
import HeaderNormal from '../Header/HeaderNormal';
import Footer from '../Footer/Footer';

export default class ResearcherRegister extends Component{

constructor(props){
    super(props);

    this.state = {
        researcherTopic:"",
        researcherName:"",
        researcherEmail:"",
        researcherPhone:"",
        researcherQualifications:"",
        researcherPassword:"",
        researcherConfirmPassword:"",

    }
}

handleInputChange = (e) => {
    const {name, value} = e.target;

    this.setState({
        ...this.state,
        [name]: value
    })
    
}

onSubmit = (e) => {
    e.preventDefault();

    const { researcherTopic, researcherName, researcherEmail, researcherPhone, researcherQualifications ,researcherPassword,researcherConfirmPassword }= this.state;
    if(this.state.researcherPassword.length < 8 ){
        setTimeout((err)=>{
            return alert("Password must contain atleast 8 characters"); 
        },2000);
        
    }
    if( this.state.researcherPassword !== this.state.researcherConfirmPassword){
        setTimeout((err)=>{
            return alert("Password miss matching"); 
        },2000);
        
    }
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
        researcherQualifications: researcherQualifications ,
        researcherPassword: researcherPassword
    }
    axios.post('http://localhost:5000/researcher/researcherregister', data).then((res) =>{
        if(res.data.success){
            localStorage.setItem("researcherToken", res.data.token);
            this.setState(
                {   
                    researcherTopic:"",
                    researcherName:"",
                    researcherEmail:"",
                    researcherPhone:"",
                    researcherQualifications:"",
                    researcherPassword:"",
                    researcherConfirmPassword:""
                }
            )
<<<<<<< HEAD
            this.props.history.push('/researcherlogin');
        }
=======
            alert('Registered Successfully')
            this.props.history.push('/researcherlogin');
        }
        else{
            alert('Registration unsuccessful. Try again later.')
        }
        
>>>>>>> 4ce0d41... Final AF Commit
    })
    }
}

render (){
    return (
        <div>
            <HeaderNormal/>

            <main id="register">
            <div className="registration-container" style={{ marginTop:'2%'}}>
            <h1 htmlFor="role" className="text-dark" style={{textAlign:"center", fontWeight:"bolder", fontFamily:'fantasy'}}>REGISTER</h1><br/>
                <div class="row-register">
                        <div class="column-register" style={{background: '#fff', borderTopLeftRadius:'5px', borderBottomLeftRadius:'5px'}}>
                        <img className="form-img" src={logo} alt="Logo" />
                        </div>
                        <div class="column-register" style={{background:'#fff'}}>
                        <br/>

                        <div className="form-group">
                                
                                <input 
                                    type="text" 
                                    id="researcherTopic" 
                                    value={this.state.researcherTopic} 
                                    onChange={this.handleInputChange}
                                    name="researcherTopic" 
                                    placeholder="Enter Research Topic"
                                    required/>
                            </div>
        
                            <div className="form-group">
                                
                                <input 
                                    type="text" 
                                    id="researcherName" 
                                    value={this.state.researcherName} 
                                    onChange={this.handleInputChange}
                                    name="researcherName" 
                                    placeholder="Enter name"
                                    required/>
                            </div>
        
                            <div className="form-group">
                               
                                <input 
                                    type="text" 
                                    id="researcherEmail" 
                                    value={this.state.researcherEmail} 
                                    onChange={this.handleInputChange}
                                    name="researcherEmail" 
                                    placeholder="Enter email"
                                    required/>
                            </div>           
        
                            <div className="form-group">
                                
                                <input 
                                    type="text" 
                                    id="researcherPhone" 
                                    value={this.state.researcherPhone} 
                                    onChange={this.handleInputChange} 
                                    name="researcherPhone" 
                                    placeholder="Enter 10 digit contact number"
                                    required/>
                            </div> 
        
                            <div className="form-group">
                                
                                <input 
                                    type="text" 
                                    id="researcherQualifications" 
                                    value={this.state.researcherQualifications} 
                                    onChange={this.handleInputChange}
                                    name="researcherQualifications"
                                    placeholder="Enter Qualification Details"
                                    required/>
                            </div> 
        
                            <div className="form-group">
                                
                                <input 
                                    type="password" 
                                    id="researcherPassword" 
                                    value={this.state.researcherPassword} 
                                    onChange={this.handleInputChange}
                                    name="researcherPassword" 
                                    placeholder="Enter Password. Password should contain at least 8 characters"
                                    required/>
                            </div>
        
                            <div className="form-group">
                                
                                <input 
                                    type="password" 
                                    id="researcherConfirmPassword" 
                                    value={this.state.researcherConfirmPassword} 
                                    onChange={this.handleInputChange}
                                    name="researcherConfirmPassword"  
                                    placeholder="Confirm Password..."
                                    required/>
                            </div><hr/>

                            <div className="form-group" style={{marginLeft:'30%'}}>
                            <button type="submit" onClick={this.onSubmit} className="form-btn-register">Register</button>
                            </div>

                            <span>
                            <Link to="/researcherlogin" style={{float:'right',marginRight:'20px',fontSize:'14px', fontWeight:"bolder", fontFamily:'cursive'}}>Already have an account? Login.</Link>
                            </span>
                        </div>
                    </div>

            </div>
            </main>
     
            <Footer/>
        </div> 
        
        );
}

}


        
