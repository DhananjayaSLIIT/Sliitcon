/* eslint-disable no-unused-vars */
import React, {useState, Component} from 'react';
import axios from 'axios';
import '../../css/styles.css';
import '../../css/form.css';
import logo from '../../img/forgotpassword.png'
import HeaderNormal from '../Header/HeaderNormal';
import Footer from '../Footer/Footer';

export default class EditorForgotpassword extends Component{

    constructor (props){
        super(props);
    
        this.state = {
            editorEmail:"",
        }
    }
    
    handleInputChange = (e) => {
        const {name, value} = e.target;
    
        this.setState({
            ...this.state,
            [name]: value
        })
        
    }


    editorForgotpasswordHandler = async (e) => {
        e.preventDefault();
 
        const {editorEmail} = this.state;

        const data = {
            editorEmail: editorEmail
        } 
       
            await axios.post("http://localhost:5000/editor/editorforgotpassword", data).then((res) =>{
                
            if(res.data.success){
                this.setState(data.data)
<<<<<<< HEAD
=======
                alert('Email has been sent')
>>>>>>> 4ce0d41... Final AF Commit
                this.props.history.push('/editorlogin');
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
    id="editorEmail" 
    value={this.state.editorEmail} 
    onChange={this.handleInputChange}
    name="editorEmail" 
    placeholder="Enter email your registered with"
    tabIndex={1}
    required/>
</div><hr/>

<div className="form-group" style={{marginLeft:'30%'}}>
<button type="submit" className="form-btn-forgotpassword" onClick={this.editorForgotpasswordHandler}>Send Email</button>
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

