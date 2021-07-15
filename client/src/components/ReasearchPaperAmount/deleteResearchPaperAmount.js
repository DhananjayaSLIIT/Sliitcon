import React, { Component } from 'react'
import '../css/virajCSS.css'
import axios from 'axios';
import HeaderAdmin from '../Header/HeaderAdmin';
import Footer from '../Footer/Footer';

/**Defining the initial state of the research paper amount*/
const initialState = {
    researchPaperAmount: ''
}

export default class deleteResearchPaperAmount extends Component {
    /**Constructor for getting the records */
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.state = initialState;
    }
    /**This method is to retreive the research paper fee */
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

    /**This method is to change the state of the fee */
    onChangeAmount(e){
        this.setState({ researchPaperAmount: e.target.value })
    }

    /**This method is to invoke the delete functionality of the research paper fee  */
    onSubmit(e) {
        e.preventDefault();
        let researchPaperAMT = {
            researchPaperAmount: this.state.researchPaperAmount
        }
        console.log('DATA TO SEND', researchPaperAMT);
        axios.delete(`http://localhost:5000/adminPayment/delete/${this.props.match.params.id}`, researchPaperAMT)
        alert("Item Deleted Successfully");
        window.location = '/get-allRPayment/'
    }

    render() {
        return (
            <div>
                <HeaderAdmin/>
                <div className="container">
                    <div className="view-account">  
                        <div className="content-panel">
                            <h2 className="title">Delete The Research Paper Amount</h2><br/>
                            <div className="billing">
                                <form className="form" id="formid" onSubmit={this.onSubmit} >
                                    <div className="form-group row">
                                        <label className="col-sm-5 control-label">Research Paper Fee</label>
                                        <div className="col-sm-5">
                                            <input type="text" className="form-control" id="researchPaperAmount" name="researchPaperAmount" value={this.state.researchPaperAmount} onChange={this.onChangeAmount} placeholder="Enter Research Paper Fee" required/> 
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
