/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, {Component,useState, useEffect} from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import logo from '../../img/register.png'
import HeaderAdmin from '../Header/HeaderAdmin';
import Footer from '../Footer/Footer'

export default class ReviewerEdit extends Component{

constructor(props){
    super(props);

    this.state = {
        reviewerName:"",
        reviewerEmail:""

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

    axios.get(`http://localhost:5000/reviewer/reviewerdata/${id}`).then((res) =>{
        if(res.data.success){
            this.setState({
                reviewerName: res.data.reviewer.reviewerName,
                reviewerEmail: res.data.reviewer.reviewerEmail,

            });
            console.log(this.state.reviewerdata)
        }
    })
}

onSubmit = (e) => {
    e.preventDefault();

    const id = this.props.match.params.id
    const { reviewerName, reviewerEmail}= this.state;
        
    const data = {
        reviewerName: reviewerName, 
        reviewerEmail: reviewerEmail,
    }
    axios.put(`http://localhost:5000/reviewer/updatereviewer/${id}`, data).then((res) =>{
        if(res.data.success){
            alert("Updated successfully");
            this.setState(
                {   
                    reviewerName:"",
                    reviewerEmail:"",
                }
            )
        }
    })
    this.props.history.push('/reviewerdetails');
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
                                    id="reviewerName" 
                                    value={this.state.reviewerName} 
                                    onChange={this.handleInputChange}
                                    name="reviewerName" 
                                    placeholder="Enter name"
                                    required/>
                            </div><hr/>
        
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    id="reviewerEmail" 
                                    value={this.state.reviewerEmail} 
                                    onChange={this.handleInputChange}
                                    name="reviewerEmail" 
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


