import React, { Component } from 'react'
import '../css/virajCSS.css'
import axios from 'axios';
import HeaderAdmin from '../Header/HeaderAdmin';
import Footer from '../Footer/Footer';

/**Defining the initial state research paper amount */
const initialState = {
    researchPaperAmount: ''
}

export default class insertResearchPaperAmount extends Component {
    /**Constructor for getting the records */
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;
    }
    /**This method is to set the state of the parameter to be sent ot the database */
    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    /**This method is to invoke the insert functionality of the research paper amount */
    onSubmit(e) {
        e.preventDefault();
        let pay = {
            researchPaperAmount: this.state.researchPaperAmount
            
        };
        console.log('DATA TO SEND', pay);
        axios.post('http://localhost:5000/adminPayment/create',pay)
        .then(response=> {
            window.location = '/get-allRPayment/'
            alert('Payment fee inserted successfully!')
        })
        .catch(error => {
            console.log(error.message);
            alert(error.message)
        })
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
                                <h1 className="title"style={{textAlign:'center'}}><u>Insert The Research Paper Amount</u></h1><br/>
                                    <div className="form-group row">
                                        <label className="col-sm-5 control-label">Research Paper Fee</label>
                                        <div className="col-sm-5">
                                            <input type="text" className="form-control" id="researchPaperAmount" name="researchPaperAmount" value={this.state.researchPaperAmount} onChange={this.onChange}  placeholder="Enter Research Paper Fee" required/> 
                                        </div>
                                    </div><br/>
                                        <hr/>
                                    <div className="action-wrapper text-center">
                                        <div className="action-btn form-group">
                                            <button className="form-btn btn btn-success btn-lg " type="submit" >
                                                Confirm
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
