import React, { Component } from 'react'
import '../css/virajCSS.css'
import axios from 'axios';
import Footer from '../Footer/Footer';
import HeaderReviewer from '../Header/HeaderReviewer';

/**Defining the initial state of the work shops which has to be deleted */
const initialState = {
    workshopTopic: '',
    conference: '',
    email: '',
    contactNumber: '',
    reviewerStatus: ''
}
export default class deleteWorkshop extends Component {
    /**Constructor for getting the records */
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;
    }
    /**This method is to retrieve a workshops which is to be deleted by the reveiwer*/
    componentDidMount() {
        axios.get(`http://localhost:5000/workshop/get-OneWorkshop/${this.props.match.params.workshopTopic}`)
        .then(response => {
          this.setState({ 
            workshopTopic: response.data.workshopTopic,
            conference: response.data.conference,
            email: response.data.email,
            contactNumber: response.data.contactNumber,
            reviewerStatus: response.data.reviewerStatus})
        })
        .catch(error => {
          alert(error.message)
        })
    }
    /**This is to set the state of the workshops attributes which are to be deleted */
    onChange(e){
        this.setState({ workshopTopic: e.target.value,
                        conference: e.target.value,
                        email: e.target.value,
                        contactNumber: e.target.value,
                        reviewerStatus: e.target.value})
    }
    /**This method is to invoke the delete funcitonality of the work shops- by the reviwer */
    onSubmit(e) {
        e.preventDefault();
        let deleteWorkSHop = {
            workshopTopic: this.state.workshopTopic,
            conference: this.state.conference,
            email: this.state.email,
            contactNumber: this.state.contactNumber,
            reviewerStatus: this.state.reviewerStatus
        }
        console.log('DATA TO SEND', deleteWorkSHop);
        axios.delete(`http://localhost:5000/workshop/delete/${this.props.match.params.workshopTopic}`, deleteWorkSHop)
        .then(response => {
            window.location = '/get-allWorkshops/'
            alert('Data successfully deleted')
          })
          .catch(error => {
            console.log(error.message);
            alert(error.message)
          })

    }
    render() {
        return (
            <div>
                <HeaderReviewer/>
                <div className="container">
                    <div className="view-account">  
                        <div className="content-panel"><br/>
                        <h1 style={{textAlign:'center', textDecoration:'underline'}}>Delete This Workshop</h1>
                            <div className="billing">
                                <form className="form" id="formid" onSubmit={this.onSubmit} >
                                    <div className="form-group row">
                                        <label className="col-sm-5 control-label">Work-Shop Topic</label>
                                        <div className="col-sm-5">
                                            <input type="text" className="form-control" id="workshopTopic" name="workshopTopic" value={this.state.workshopTopic} onChange={this.onChange}  placeholder="Enter The Conference Name" required/> 
                                        </div>
                                    </div><br/>
                                    <div className="form-group row">
                                        <label className="col-sm-5 control-label">Conference</label>
                                        <div className="col-sm-5">
                                            <input type="text" className="form-control" id="conference" name="conference" value={this.state.conference} onChange={this.onChange}  placeholder="Enter Your Email" required/> 
                                        </div>
                                    </div><br/>
                                    <div className="form-group row">
                                        <label className="col-sm-5 control-label">Email</label>
                                        <div className="col-sm-5">
                                            <input type="Email" className="form-control" id="email" name="email" value={this.state.email} onChange={this.onChange}  placeholder="Enter Your Contact Number" required/> 
                                        </div>
                                    </div><br/>
                                    <div className="form-group row">
                                        <label className="col-sm-5 control-label">Contact Number</label>
                                        <div className="col-sm-5">
                                            <input type="Number" style={{width:'100%'}} className="form-control" id="contactNumber" name="contactNumber" value={this.state.contactNumber} onChange={this.onChange}  placeholder="Enter Your Email" required/> 
                                        </div>
                                    </div><br/>
                                    <div className="form-group row">
                                        <label className="col-sm-5 control-label">Status</label>
                                        <div className="col-sm-5">
                                            <input type="text" className="form-control" id="reviewerStatus" name="reviewerStatus" value={this.state.reviewerStatus} onChange={this.onChange}  placeholder="Enter Your Email" required/> 
                                        </div>
                                    </div><br/>
                                    <hr/>
                                    <div className="action-wrapper text-center">
                                        <div className="action-btn form-group">
                                            <button className="form-btn btn btn-success btn-lg " type="submit" >
                                               Delete
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}
