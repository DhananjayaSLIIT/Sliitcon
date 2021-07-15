/* eslint-disable no-unused-vars */
import React,{useState, Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import '../../css/styles.css';
import '../../css/form.css';
import logo from '../../img/resetpassword.png'
import HeaderNormal from '../Header/HeaderNormal';
import Footer from '../Footer/Footer';

export default class WorkShopResetpassword extends Component {

    constructor (props){
        super(props );
    
        this.state = {
            workShopPassword:"",
            workShopConfirmPassword:""
            
        }
    }
    
    handleInputChange = (e) => {
        const {name, value} = e.target;
    
        this.setState({
            ...this.state,
            [name]: value
        })
        
    }

workShopResetpasswordHandler = async (e) => {
    e.preventDefault();

    const {workShopPassword,workShopConfirmPassword }= this.state;

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
    const data = {
        workShopPassword: workShopPassword
    }
    
    await axios.put(`http://localhost:5000/workshop/workshopresetpassword/${this.props.match.params.resetToken}`,data).then((res) =>{

    if(res.data.success){
                this.setState(data.data)
                this.props.history.push('/workshoplogin');
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
                                    </div><br/><hr/>
                           
                            <div className="form-group" style={{marginLeft:'30%'}}>
                                <button type="submit" className="form-btn-resetpassword" onClick={this.workShopResetpasswordHandler}>Reset Password</button>
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


