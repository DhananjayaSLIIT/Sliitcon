/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import logo from '../../img/popup.png'
import HeaderNormal from '../Header/HeaderNormal'
import Footer from '../Footer/Footer';

export default class RegisterPopup extends Component{

    state = { selectedRole: "" };

  registerHandler = e => {

       
        if(  e.target.checked && e.target.value === "Researcher" ){
            this.props.history.push("/researcherregister")
        }
        if(  e.target.checked && e.target.value === "WorkShop" ){
            this.props.history.push("/workshopregister")
        }
        this.setState({ selectedRole: e.target.value })

  } 
  
  render() {
    const { selectedRole } = this.state;
    const { history } = this.props;
    return (
        <div>
            <HeaderNormal/>
            <div className="pop-container" style={{ marginTop:'2%'}}>
            <h1 htmlFor="role" className="text-dark" style={{textAlign:"center", fontWeight:"bolder", fontFamily:'fantasy'}}>Select Your Role</h1><br/>
                <div class="row-pop">
                        <div class="column-pop" style={{background: '#fff', borderTopLeftRadius:'5px', borderBottomLeftRadius:'5px'}}>
                        <img className="form-img" src={logo} alt="Logo" />
                        </div>
                        <div class="column-pop" style={{background:'#fff'}}>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <div className="form-group">
               
                            <div className="radio downlist">
                                <input 
                                    type="radio" 
                                    id="radio-2"  
                                    name="role"
                                    checked={selectedRole === "Researcher"}
                                    onChange={this.registerHandler} 
                                    value="Researcher" />
                                <label htmlFor="radio-2" className="radio-label">Researcher</label>
                            </div><br/>
                            <div className="radio downlist">
                                <input 
                                    type="radio" 
                                    id="radio-3" 
                                    name="role"
                                    checked={selectedRole === "WorkShop"}
                                    onChange={this.registerHandler}  
                                    value="WorkShop" />
                                <label htmlFor="radio-3" className="radio-label">Work Shop Presenter</label>
                            </div><br/>
                    </div><br/>
                
                        </div>
                    </div>

            </div>
                <Footer/>
        </div>
    );
  };
};
