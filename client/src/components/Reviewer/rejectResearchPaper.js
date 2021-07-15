import React, { Component } from 'react'
import '../css/virajCSS.css'
import axios from 'axios';
import Footer from '../Footer/Footer';
import HeaderReviewer from '../Header/HeaderReviewer';

/**Defining the initial state of the research paper which has to be rejected */
const initialState = {
    researchTitle: '',
    conference: '',
    researchEmail: '',
    researchPhone: '',
    reviewerStatus: ''
}
export default class rejectResearchPaper extends Component {
    /**Constructor for getting the records */
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;
    }

    /**This method is to retrieve a research paper which is to be rejected by the reviewer  */
    componentDidMount() {
        axios.get(`http://localhost:5000/api/v1/get-OneResearchPaper/${this.props.match.params.researchTitle}`)
        .then(response => {
          this.setState({ 
            researchTitle: response.data.researchTitle,
            conference: response.data.conference,
            researchEmail: response.data.researchEmail,
            researchPhone: response.data.researchPhone,
            reviewerStatus: response.data.reviewerStatus})
        })
        .catch(error => {
          alert(error.message)
        })
    }

    /**This is to set the state of the research paper attributes which are to be rejected */
    onChange(e){
        this.setState({ researchTitle: e.target.value,
                        conference: e.target.value,
                        researchEmail: e.target.value,
                        researchPhone: e.target.value,
                        reviewerStatus: e.target.value})
    }

    /**This method is to invoke the insert funcitonality(reject) of the research papers which will be sent to the researcher */
    onSubmit(e) {
        e.preventDefault();
        let rejectRPaper = {
            researchTitle: this.state.researchTitle,
            conference: this.state.conference,
            researchEmail: this.state.researchEmail,
            researchPhone: this.state.researchPhone,
            reviewerStatus: this.state.reviewerStatus
        }
        /**Change the state to reject */
        console.log('DATA TO SEND', rejectRPaper);
        axios.put(`http://localhost:5000/api/v1/update/reject/${this.props.match.params.researchTitle}`, rejectRPaper)
        .then(response => {
            window.location = '/get-allResearchPapers/'
            alert('This Research Paper Is Rejected')
          })
          .catch(error => {
            console.log(error.message);
            alert(error.message)
        })

        let rejectRPaper1 = {
            researchTitle: this.state.researchTitle,
            contactNumber: this.state.contactNumber
        }
         /**Inserting it to the researcher notification table */
        console.log('DATA TO SEND', rejectRPaper1);
        axios.post('http://localhost:5000/researcherNotification/createReject', rejectRPaper1)
        .then(response => {
            window.location = '/get-allResearchPapers/'
           // alert('This Research Paper Is Rejected')
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
                        <h1 style={{textAlign:'center', textDecoration:'underline'}}>Reject This Research Paper</h1>
                            <div className="billing">
                                <form className="form" id="formid" onSubmit={this.onSubmit} >
                                    <div className="form-group row">
                                        <label className="col-sm-5 control-label">Research Paper Title</label>
                                        <div className="col-sm-5">
                                            <input type="text" className="form-control" id="researchTitle" name="researchTitle" value={this.state.researchTitle} onChange={this.onChange}  placeholder="Enter The Conference Name" required/> 
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
                                            <input type="Email" className="form-control" id="researchEmail" name="researchEmail" value={this.state.researchEmail} onChange={this.onChange}  placeholder="Enter Your Contact Number" required/> 
                                        </div>
                                    </div><br/>
                                    <div className="form-group row">
                                        <label className="col-sm-5 control-label">Contact Number</label>
                                        <div className="col-sm-5">
                                            <input type="Number" style={{width:'100%'}} className="form-control" id="researchPhone" name="researchPhone" value={this.state.researchPhone} onChange={this.onChange}  placeholder="Enter Your Email" required/> 
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
                                               Reject Research Paper
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
