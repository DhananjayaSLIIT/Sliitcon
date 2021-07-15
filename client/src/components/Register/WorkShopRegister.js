/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, {Component,useState, useEffect} from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import logo from '../../img/register.png'
import HeaderNormal from '../Header/HeaderNormal';
import Footer from '../Footer/Footer';

export default class WorkShopRegister extends Component{

constructor(props){
    super(props);

    this.state = {
        workShopTitle:"",
        workShopName:"",
        workShopEmail:"",
        workShopPhone:"",
        workShopDescription:"",
        workShopPassword:"",
        workShopConfirmPassword:"",

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

    const { workShopTitle, workShopName, workShopEmail, workShopPhone, workShopDescription ,workShopPassword,workShopConfirmPassword }= this.state;
    if(this.state.workShopPassword.length < 8 ){
        setTimeout((err)=>{
            return alert("Password must contain atleast 8 characters"); 
        },2000);
        
    }
    if( this.state.workShopPassword !== this.state.workShopConfirmPassword){
        setTimeout((err)=>{
            return alert("Password miss matching"); 
        },2000);
        
    }
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
        workShopDescription: workShopDescription ,
        workShopPassword: workShopPassword
    }
    axios.post('http://localhost:5000/workshop/workshopregister', data).then((res) =>{
        if(res.data.success){
            localStorage.setItem("workshopToken", res.data.token);
            this.setState(
                {   
                    workShopTitle:"",
                    workShopName:"",
                    workShopEmail:"",
                    workShopPhone:"",
                    workShopDescription:"",
                    workShopPassword:"",
                    workShopConfirmPassword:""
                }
            )
<<<<<<< HEAD
            this.props.history.push('/workshoplogin');
        }
=======
            alert('Registered Successfully')
            this.props.history.push('/workshoplogin');
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
                                    id="workShopTitle" 
                                    value={this.state.workShopTitle} 
                                    onChange={this.handleInputChange}
                                    name="workShopTitle" 
                                    placeholder="Enter work shop title"
                                    required/>
                                </div>
                                
                                <div className="form-group">
                                
                                <input 
                                    type="text" 
                                    id="workShopName" 
                                    value={this.state.workShopName} 
                                    onChange={this.handleInputChange}
                                    name="workShopName" 
                                    placeholder="Enter work shop owners name"
                                    required/>
                                </div>
                                
                                <div className="form-group">
                                
                                <input 
                                    type="text" 
                                    id="workShopEmail" 
                                    value={this.state.workShopEmail} 
                                    onChange={this.handleInputChange}
                                    name="workShopEmail" 
                                    placeholder="Enter email"
                                    required/>
                                </div>           
                                
                                <div className="form-group">
                                
                                <input 
                                    type="text" 
                                    id="workShopPhone" 
                                    value={this.state.workShopPhone} 
                                    onChange={this.handleInputChange} 
                                    name="workShopPhone" 
                                    placeholder="Enter 10 digit contact number"
                                    required/>
                                </div>  
                                
                                <div className="form-group">
                                
                                <input 
                                    type="text" 
                                    id="workShopDescription" 
                                    value={this.state.workShopDescription} 
                                    onChange={this.handleInputChange}
                                    name="workShopDescription"
                                    placeholder="Enter a small description about your work shop"
                                    required/>
                                </div>
                                
                                <div className="form-group">
                                
                                <input 
                                    type="password" 
                                    id="workShopPassword" 
                                    value={this.state.workShopPassword} 
                                    onChange={this.handleInputChange}
                                    name="workShopPassword" 
                                    placeholder="Enter Password. Password should contain at least 8 characters"
                                    required/>
                                </div>
                                
                                <div className="form-group">
                                
                                <input 
                                    type="password" 
                                    id="workShopConfirmPassword" 
                                    value={this.state.workShopConfirmPassword} 
                                    onChange={this.handleInputChange}
                                    name="workShopConfirmPassword"  
                                    placeholder="Confirm Password..."
                                    required/>
                                </div><hr/>

                            <div className="form-group" style={{marginLeft:'30%'}}>
                            <button type="submit" onClick={this.onSubmit} className="form-btn-register">Register</button>
                            </div>

                            <span>
                            <Link to="/workshoplogin" style={{float:'right',marginRight:'20px',fontSize:'14px', fontWeight:"bolder", fontFamily:'cursive'}}>Already have an account? Login.</Link>
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



