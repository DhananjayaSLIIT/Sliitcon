/* eslint-disable no-unused-vars */
import React,{useState, Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import '../../css/styles.css';
import '../../css/form.css';
import logo from '../../img/resetpassword.png'
import HeaderNormal from '../Header/HeaderNormal';
import Footer from '../Footer/Footer';

export default class EditorResetpassword extends Component {

    constructor (props){
        super(props );
    
        this.state = {
            editorPassword:"",
            editorConfirmPassword:""
            
        }
    }
    
    handleInputChange = (e) => {
        const {name, value} = e.target;
    
        this.setState({
            ...this.state,
            [name]: value
        })
        
    }

editorResetpasswordHandler = async (e) => {
    e.preventDefault();

    const {editorPassword,editorConfirmPassword }= this.state;

    if(this.state.editorPassword.length < 8 ){
        setTimeout((err)=>{
            return alert("Password must contain atleast 8 characters"); 
        },2000);
        
    }
    if( this.state.editorPassword !== this.state.editorConfirmPassword){
        setTimeout((err)=>{
            return alert("Password miss matching"); 
        },2000);
        
    }
    const data = {
        editorPassword: editorPassword
    }
    
    await axios.put(`http://localhost:5000/editor/editorresetpassword/${this.props.match.params.resetToken}`,data).then((res) =>{

    if(res.data.success){
                this.setState(data.data)
                this.props.history.push('/editorlogin');
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
                                            id="editorPassword" 
                                            value={this.state.editorPassword} 
                                            onChange={this.handleInputChange}
                                            name="editorPassword" 
                                            placeholder="Enter Password. Password should contain at least 8 characters"
                                            required/>
                                    </div>
                
                                    <div className="form-group">
                                        
                                        <input 
                                            type="password" 
                                            id="editorConfirmPassword" 
                                            value={this.state.editorConfirmPassword} 
                                            onChange={this.handleInputChange}
                                            name="editorConfirmPassword"  
                                            placeholder="Confirm Password..."
                                            required/>
                                    </div><br/><hr/>
                           
                            <div className="form-group" style={{marginLeft:'30%'}}>
                                <button type="submit" className="form-btn-resetpassword" onClick={this.editorResetpasswordHandler}>Reset Password</button>
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


