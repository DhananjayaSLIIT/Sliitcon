/* eslint-disable array-callback-return */
import React, { Component } from 'react'
import '../css/virajCSS.css'
import axios from 'axios';
import Select from 'react-select';
import HeaderNormal from '../Header/HeaderNormal';
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

export default class insertConferenceAttendee extends Component {
    /**Constructor for getting the records */
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onConferenceSelect = this.onConferenceSelect.bind(this);
        
        this.state = initialState;
    }

    /**This method is to get all the availabe conferences using the react-select */
    componentDidMount() {
        axios.get('http://localhost:5000/conference/viewAc')
        .then(response => {
            this.setState({ conference : response.data.data }, () => {
                let data = [];
                this.state.conference.map((item, index) => {
                    let conference = {
                        value: item.conferenceName,
                        label: item.conferenceName +' - Rs.'+ item.registerFee
                        
                    }
                    data.push(conference)
                });
                this.setState({options: data });
                
            })
        })
    }

    onConferenceSelect(e) {
        this.setState({selectedConference: e.value});
    }

    
    /**This is to set the state of the attributes related to the attendee */
    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
        
    }

    /**This is get all conferences for the react-select */
    // onSubjectSelect(e) {
    //     this.setState({ selectedSubjects: e ? e.map(item => item.value) : [] });
    // }

    /**This method is to invoke the insert functionality which is done by the attendee to register to a specific conference  */
    onSubmit(e) {
        e.preventDefault();
        let attendeeCreate = {
            /**Put selected conference to this.state.selectedConference */
            conferenceName: this.state.selectedConference,
            email: this.state.email,
            contactNumber: this.state.contactNumber,
            cardNumber: this.state.cardNumber,
            cvvNumber: this.state.cvvNumber,
            exDate: this.state.exDate
            
        };
        console.log('DATA TO SEND', attendeeCreate);
        axios.post('http://localhost:5000/conferenceAttendeePay/create',attendeeCreate)
        .then(response=> {
<<<<<<< HEAD
            window.location = '/get-ConferenceAttendeePayment/'
=======
            //window.location = '/get-ConferenceAttendeePayment/'
>>>>>>> 4ce0d41... Final AF Commit
            alert('Your registration for the conference is successful!')
        })
        .catch(error => {
            console.log(error.message);
            alert(error.message)
        })
    }

    render() {
        return (
            <div>
             <HeaderNormal/>
                <div className="container">
                    <div className="view-account">  
                        <div className="content-panel"><br/>
                            <h1 style={{textAlign:'center', textDecoration:'underline'}}>Register For The Conference</h1>
                            <div className="billing">
                                <form className="form" id="formid" onSubmit={this.onSubmit} >
                                    {/* <div className="form-group row">
                                        <label className="col-sm-5 control-label">Conference Name</label>
                                        <div className="col-sm-5">
                                            <input type="text" className="form-control" id="conferenceName" name="conferenceName" value={this.state.conferenceName} onChange={this.onChange}  placeholder="Enter The Conference Name" required/> 
                                        </div>
                                    </div><br/> */}
                                    <div className="form-group row">
                                        <label className="col-sm-5 control-label">Conference with Register Fee</label>
                                        <div className="col-sm-5">
                                            <Select options={this.state.options} onChange={this.onConferenceSelect} className="basic-single" />
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
                                            <input type="tel" className="form-control" id="contactNumber" name="contactNumber" pattern="^\d{10}$" value={this.state.contactNumber} onChange={this.onChange}  placeholder="Enter Your Contact Number" required/> 
                                        </div>
                                    </div><br/>
                                    <div className="form-group row">
                                        <label className="col-sm-5 control-label">Card Number</label>
                                        <div className="col-sm-5">
                                            <input type="tel" className="form-control" id="cardNumber" name="cardNumber" pattern="^\d{12}$" value={this.state.cardNumber} onChange={this.onChange}  placeholder="Enter Your Card Number" required/> 
                                        </div>
                                    </div><br/>
                                    <div className="form-group row">
                                        <label className="col-sm-5 control-label">CVV Number</label>
                                        <div className="col-sm-5">
                                            <input type="tel" className="form-control" id="cvvNumber" name="cvvNumber" pattern="^\d{3}$" value={this.state.cvvNumber} onChange={this.onChange}  placeholder="Enter Your Card CVV Number" required/> 
                                        </div>
                                    </div><br/>
                                    <div className="form-group row">
                                        <label className="col-sm-5 control-label">Expiry Date</label>
                                        <div className="col-sm-5">
<<<<<<< HEAD
                                            <input type="Month" className="form-control" id="exDate" name="exDate" value={this.state.exDate} onChange={this.onChange}  placeholder="Enter Your Contact Number" required/> 
=======
                                            <input type="Date" className="form-control" id="exDate" name="exDate" value={this.state.exDate} onChange={this.onChange}  placeholder="Enter Your Card Month" required/> 
>>>>>>> 4ce0d41... Final AF Commit
                                        </div>
                                    </div><br/>
                                    {/* <p>* To Register For The Conference You Have To Pay Rs.1000.00</p> */}
                                    <hr/>
                                    <div className="action-wrapper text-center">
                                        <div className="action-btn form-group">
                                            <button className="form-btn btn btn-success btn-lg " type="submit" >
                                               Pay & Register
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
