import React, { Component } from 'react'
import '../css/virajCSS.css'
import axios from 'axios';
import HeaderAdmin from '../Header/HeaderAdmin';
import Footer from '../Footer/Footer';

/**Defining the initial state research paper amount */
const initialState = {
    researchPaperAmount: ''
}

export default class updateResearchPaperAmount extends Component {
    /**Constructor for getting the records */
    constructor(props) {
        super(props);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;
    }

    /**This method is to retreive the research paper amount */
    componentDidMount() {
        axios.get(`http://localhost:5000/adminPayment/get/${this.props.match.params.id}`)
        .then(response => {
          this.setState({ 
            researchPaperAmount: response.data.researchPaperAmount})
        })
        .catch(error => {
          alert(error.message)
        })
    }

    /**This method is to set the state of the research paper amount  */
    onChangeAmount(e){
        this.setState({ researchPaperAmount: e.target.value })
    }

    /**This method is to invoke the update functionality of the research paper amount */
    onSubmit(e) {
        e.preventDefault();
        let researchPaperAMT = {
            researchPaperAmount: this.state.researchPaperAmount
        }
        console.log('DATA TO SEND', researchPaperAMT);
        axios.put(`http://localhost:5000/adminPayment/update/${this.props.match.params.id}`, researchPaperAMT)
        .then(response => {
            if(response.data != null) {
                this.setState(this.initialState);
                window.location = '/get-allRPayment/'
                alert("Record Updated Successfully");
            }
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
                            <h2 className="title">Update The Research Paper Amount</h2><br/>
                            <div className="billing">
                                <form className="form" id="formid" onSubmit={this.onSubmit} >
                                    <div className="form-group row">
                                        <label className="col-sm-5 control-label">Research Paper Fee</label>
                                        <div className="col-sm-5">
                                            <input type="text" className="form-control" id="researchPaperAmount" name="researchPaperAmount" value={this.state.researchPaperAmount} onChange={this.onChangeAmount}  placeholder="Enter Research Paper Fee" required/> 
                                        </div>
                                    </div><br/>
                                        <hr/>
                                    <div className="action-wrapper text-center">
                                        <div className="action-btn form-group">
                                            <button className="form-btn btn btn-success btn-lg " type="submit" >
                                                Update
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
