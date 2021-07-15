/* eslint-disable no-unused-vars */
import React, {useState, Component} from 'react';
import axios from 'axios';
import '../../css/styles.css';
import '../../css/form.css';
import logo from '../../img/forgotpassword.png'
import HeaderNormal from '../Header/HeaderNormal';
import Footer from '../Footer/Footer';

export default class AdminForgotpassword extends Component{

    constructor (props){
        super(props);
    
        this.state = {
            adminEmail:"",
        }
    }
    
    handleInputChange = (e) => {
        const {name, value} = e.target;
    
        this.setState({
            ...this.state,
            [name]: value
        })
        
    }


    adminForgotpasswordHandler = async (e) => {
        e.preventDefault();
 
        const {adminEmail} = this.state;

        const data = {
            adminEmail: adminEmail
        } 
       
            await axios.post("http://localhost:5000/admin/adminforgotpassword", data).then((res) =>{
                
            if(res.data.success){
                this.setState(data.data)
<<<<<<< HEAD
=======
                alert('Email has been sent')
>>>>>>> 4ce0d41... Final AF Commit
                this.props.history.push('/adminlogin');
            }
            
            })
 
    
    }


render (){
    return (
        <div>
            <HeaderNormal/>
            <main id="register">
            <div className="login-container" style={{ marginTop:'2%'}}>
            <h1 htmlFor="role" className="text-dark" style={{textAlign:"center", fontWeight:"bolder", fontFamily:'fantasy'}}>Forgot Password</h1><br/>
                <div class="row-login">
                        <div class="column-login" style={{background: '#fff', borderTopLeftRadius:'5px', borderBottomLeftRadius:'5px'}}>
                        <img className="form-img" src={logo} alt="Logo" />
                        </div>
                        <div class="column-login" style={{background:'#fff'}}>
                        <br/>
                        <br/>
                        
               
<p className="text-label" style={{color:"black",fontFamily:'cursive',fontSize:'14px',  textAlign:"center"}}>
Please enter the email address you register your account with. We will send you a reset password link to this email. Click on the link and Reset Your Password.
</p>
<br/>
<div className="form-group">

<input 
    type="text" 
    id="adminEmail" 
    value={this.state.adminEmail} 
    onChange={this.handleInputChange}
    name="adminEmail" 
    placeholder="Enter email your registered with"
    tabIndex={1}
    required/>
</div><hr/>

<div className="form-group" style={{marginLeft:'30%'}}>
<button type="submit" className="form-btn-forgotpassword" onClick={this.adminForgotpasswordHandler}>Send Email</button>
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

