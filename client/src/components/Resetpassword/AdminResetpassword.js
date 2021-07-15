/* eslint-disable no-unused-vars */
import React,{useState, Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import '../../css/styles.css';
import '../../css/form.css';
import logo from '../../img/resetpassword.png'
import HeaderNormal from '../Header/HeaderNormal';
import Footer from '../Footer/Footer';

export default class AdminResetpassword extends Component {

    constructor (props){
        super(props );
    
        this.state = {
            adminPassword:"",
            adminConfirmPassword:""
            
        }
    }
    
    handleInputChange = (e) => {
        const {name, value} = e.target;
    
        this.setState({
            ...this.state,
            [name]: value
        })
        
    }

adminResetpasswordHandler = async (e) => {
    e.preventDefault();

    const {adminPassword,adminConfirmPassword }= this.state;

    if(this.state.adminPassword.length < 8 ){
        setTimeout((err)=>{
            return alert("Password must contain atleast 8 characters"); 
        },2000);
        
    }
    if( this.state.adminPassword !== this.state.adminConfirmPassword){
        setTimeout((err)=>{
            return alert("Password miss matching"); 
        },2000);
        
    }
    const data = {
        adminPassword: adminPassword
    }
    
    await axios.put(`http://localhost:5000/admin/adminresetpassword/${this.props.match.params.resetToken}`,data).then((res) =>{

    if(res.data.success){
                this.setState(data.data)
                this.props.history.push('/adminlogin');
            }
            
    })

    

};

render (){
    return (

<div>
<HeaderNormal/>
<main id="register">
<div className="login-container" style={{ marginTop:'2%'}}>
<h1 htmlFor="role" className="text-dark" style={{textAlign:"center", fontWeight:"bolder", fontFamily:'fantasy'}}>Reset Password</h1><br/>
    <div class="row-resetpassword">
            <div class="column-resetpassword" style={{background: '#fff', borderTopLeftRadius:'5px', borderBottomLeftRadius:'5px'}}>
            <img className="form-img" src={logo} alt="Logo" />
            </div>
            <div class="column-resetpassword" style={{background:'#fff'}}>
            <br/>
            <br/>
   
<div className="form-group">
                                        
                                        <input 
                                            type="password" 
                                            id="adminPassword" 
                                            value={this.state.adminPassword} 
                                            onChange={this.handleInputChange}
                                            name="adminPassword" 
                                            placeholder="Enter Password. Password should contain at least 8 characters"
                                            required/>
                                    </div>
                
                                    <div className="form-group">
                                        
                                        <input 
                                            type="password" 
                                            id="adminConfirmPassword" 
                                            value={this.state.adminConfirmPassword} 
                                            onChange={this.handleInputChange}
                                            name="adminConfirmPassword"  
                                            placeholder="Confirm Password..."
                                            required/>
                                    </div><br/><hr/>
                           
                            <div className="form-group" style={{marginLeft:'30%'}}>
                                <button type="submit" className="form-btn-resetpassword" onClick={this.adminResetpasswordHandler}>Reset Password</button>
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
