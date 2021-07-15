/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, {Component,useState, useEffect} from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import logo from '../../img/register.png'
import HeaderAdmin from '../Header/HeaderAdmin';
import Footer from '../Footer/Footer'

export default class EditorEdit extends Component{

constructor(props){
    super(props);

    this.state = {
        editorName:"",
        editorEmail:""

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

    axios.get(`http://localhost:5000/editor/editordata/${id}`).then((res) =>{
        if(res.data.success){
            this.setState({
                editorName: res.data.editor.editorName,
                editorEmail: res.data.editor.editorEmail,

            });
            console.log(this.state.editordata)
        }
    })
}

onSubmit = (e) => {
    e.preventDefault();

    const id = this.props.match.params.id
    const { editorName, editorEmail}= this.state;
        
    const data = {
        editorName: editorName, 
        editorEmail: editorEmail,
    }
    axios.put(`http://localhost:5000/editor/updateeditor/${id}`, data).then((res) =>{
        if(res.data.success){
            alert("Updated successfully");
            this.setState(
                {   
                    editorName:"",
                    editorEmail:"",
                }
            )
        }
    })
    this.props.history.push('/editordetails');
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
                                <input 
                                    type="text" 
                                    id="editorName" 
                                    value={this.state.editorName} 
                                    onChange={this.handleInputChange}
                                    name="editorName" 
                                    placeholder="Enter name"
                                    required/>
                            </div><hr/>
        
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    id="editorEmail" 
                                    value={this.state.editorEmail} 
                                    onChange={this.handleInputChange}
                                    name="editorEmail" 
                                    placeholder="Enter email"
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


