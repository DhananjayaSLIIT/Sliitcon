/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, {Component,useState, useEffect} from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import logo from '../../img/register.png'
import HeaderAdmin from '../Header/HeaderAdmin';
import Footer from '../Footer/Footer';

export default class ReviewerRegister extends Component{

constructor(props){
    super(props);

    this.state = {
        reviewerName:"",
        reviewerEmail:"",
        reviewerPassword:"",

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

    const { reviewerName, reviewerEmail, reviewerPassword}= this.state;
    if(this.state.reviewerPassword.length < 8 ){
        setTimeout((err)=>{
            return alert("Password must contain atleast 8 characters"); 
        },2000);
        
    }
    else{
        
    const data = {
        reviewerName: reviewerName, 
        reviewerEmail: reviewerEmail,
        reviewerPassword: reviewerPassword
    }
    axios.post('http://localhost:5000/reviewer/reviewerregister', data).then((res) =>{
        if(res.data.success){
            localStorage.setItem("reviewerToken", res.data.token);
            this.setState(
                {   
                    reviewerName:"",
                    reviewerEmail:"",
                    reviewerPassword:""
                }
            )
<<<<<<< HEAD
            this.props.history.push('/reviewerdetails');
        }
=======
            alert('Registered Successfully')
            this.props.history.push('/reviewerdetails');
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
            <HeaderAdmin/>

            <main id="register">
            <div className="registration-container" style={{ marginTop:'2%'}}>
            <h1 htmlFor="role" className="text-dark" style={{textAlign:"center", fontWeight:"bolder", fontFamily:'fantasy'}}>REGISTER</h1><br/>
                <div class="row-register">
                        <div class="column-register" style={{background: '#fff', borderTopLeftRadius:'5px', borderBottomLeftRadius:'5px'}}>
                        <img className="form-img" src={logo} alt="Logo" />
                        </div>
                        <div class="column-register" style={{background:'#fff'}}>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        

                        <div className="form-group">
                                
                                <input 
                                    type="text" 
                                    id="reviewerName" 
                                    value={this.state.reviewerName} 
                                    onChange={this.handleInputChange}
                                    name="reviewerName" 
                                    placeholder="Enter name"
                                    required/>
                            </div>
        
                            <div className="form-group">
                               
                                <input 
                                    type="text" 
                                    id="reviewerEmail" 
                                    value={this.state.reviewerEmail} 
                                    onChange={this.handleInputChange}
                                    name="reviewerEmail" 
                                    placeholder="Enter email"
                                    required/>
                            </div>            

                            <div className="form-group">
                                
                                <input 
                                    type="password" 
                                    id="reviewerPassword" 
                                    value={this.state.reviewerPassword} 
                                    onChange={this.handleInputChange}
                                    name="reviewerPassword" 
                                    placeholder="Enter Password. Password should contain at least 8 characters"
                                    required/>
                            </div><br/><hr/>

                            <div className="form-group" style={{marginLeft:'30%'}}>
                            <button type="submit" onClick={this.onSubmit} className="form-btn-register">Register</button>
                            </div>

                        </div>
                    </div>

            </div>
            </main>
     

            <Footer/>

        </div> 
        
        );
}

}

