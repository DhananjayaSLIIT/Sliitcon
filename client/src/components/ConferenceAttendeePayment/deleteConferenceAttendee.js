import React, { Component } from 'react'
import '../css/virajCSS.css'
import axios from 'axios';
import HeaderAdmin from '../Header/HeaderAdmin';
import Footer from '../Footer/Footer';

/**Defining the initial state of the attendee in the conference */
const initialState = {
    conferenceName: '',
    email: '',
    contactNumber: '',
    cardNumber:'',
    cvvNumber:'',
    exDate:''
}

export default class deleteConferenceAttendee extends Component {
    /**Constructor for getting the records */
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;
    }
    /**This method is to retreive a attendee who paid and got registered to the conference- this is viewed by Admin */
    componentDidMount() {
        axios.get(`http://localhost:5000/conferenceAttendeePay/get/${this.props.match.params.contactNumber}`)
        .then(response => {
          this.setState({ 
            conferenceName: response.data.conferenceName,
            email: response.data.email,
            contactNumber: response.data.contactNumber,
            cardNumber: response.data.cardNumber,
            cvvNumber: response.data.cvvNumber,
            exDate: response.data.exDate})
        })
        .catch(error => {
          alert(error.message)
        })
    }

    /**This is to set the state of the attributes related to the attendee */
    onChange(e){
        this.setState({ conferenceName: e.target.value,
                        email: e.target.value,
                        contactNumber: e.target.value,
                        cardNumber: e.target.value,
                        cvvNumber: e.target.value,
                        exDate: e.target.value})
    }

    /**This method is to invoke the delete functionality which is done by the admin to delete the attendee who paid  */
    onSubmit(e) {
        e.preventDefault();
        let conferenceAttendee = {
            conferenceName: this.state.conferenceName,
            email: this.state.email,
            contactNumber: this.state.contactNumber,
            cardNumber: this.state.cardNumber,
            cvvNumber: this.state.cvvNumber,
            exDate: this.state.exDate
        }
        console.log('DATA TO SEND', conferenceAttendee);
        axios.delete(`http://localhost:5000/conferenceAttendeePay/delete/${this.props.match.params.contactNumber}`, conferenceAttendee)
<<<<<<< HEAD
        window.location = '/get-ConferenceAttendeePayment/'
        alert("Item Deleted Successfully");
=======
       // window.location = '/get-ConferenceAttendeePayment/'
        alert("Item Deleted Successfully");
        window.location = '/get-ConferenceAttendeePayment/'
>>>>>>> 4ce0d41... Final AF Commit
    }
    
    render() {
        return (
            <div>
                <HeaderAdmin/>
                <div className="container">
                    <div className="view-account">  
                        <div className="content-panel">
                            
                            <div className="billing">
                                <form className="form" id="formid" onSubmit={this.onSubmit} >
                                <h2 className="title">Delete This Attendee</h2><br/>
                                    <div className="form-group row">
                                        <label className="col-sm-5 control-label">Conference Name</label>
                                        <div className="col-sm-5">
                                            <input type="text" className="form-control" id="conferenceName" name="conferenceName" value={this.state.conferenceName} onChange={this.onChange}  placeholder="Enter The Conference Name" required/> 
                                        </div>
                                    </div><br/>
                                    <div className="form-group row">
                                        <label className="col-sm-5 control-label">Email</label>
                                        <div className="col-sm-5">
                                            <input type="Email" className="form-control" id="email" name="email" value={this.state.email} onChange={this.onChange}  placeholder="Enter Your Email" required/> 
                                        </div>
                                    </div><br/>
                                    <div className="form-group row">
                                        <label className="col-sm-5 control-label">Contact Number</label>
                                        <div className="col-sm-5">
                                            <input type="Number" className="form-control" id="contactNumber" name="contactNumber" value={this.state.contactNumber} onChange={this.onChange}  placeholder="Enter Your Contact Number" required/> 
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
