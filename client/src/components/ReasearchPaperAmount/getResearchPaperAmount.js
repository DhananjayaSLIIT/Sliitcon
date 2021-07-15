/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import '../css/virajCSS2.css'
import axios from 'axios';
import HeaderAdmin from '../Header/HeaderAdmin';
import Footer from '../Footer/Footer';

export default class getResearchPaperAmount extends Component {
    /**Constructor for getting the records */
    constructor(props) {
        super(props);
        this.state = {
            researchPaperAmount: []
        }
    }
    /**This method is to retreive the research paper fee. And this is viewed by the admin */
    componentDidMount() {
        axios.get('http://localhost:5000/adminPayment/')
        .then(response => {
            this.setState({researchPaperAmount : response.data });
        })
    }

    /**This method is to navigate to the updateResearchPaperAmount page*/
    navigateToUpdatePaperAmountPage(e, adminRPayID) {
        window.location = `/get-oneRPayment/${adminRPayID}`
    }

    /**This method is to navigate to the deleteResearchPaperAmount page */
    navigateToDeletePaperAmountPage(e, adminRPayID) {
        window.location = `/delete-oneRPayment/${adminRPayID}`
    }

    render() {
        return (
            <div>
                <HeaderAdmin/>
            <div className="bodyR">
            <h1 className="title"style={{textAlign:'center'}}><u>Research Paper Amounts</u></h1><br/>
                 {this.state.researchPaperAmount.length > 0 && this.state.researchPaperAmount.map((item, index) => (
                    <div key={index} class="courses-containerR">
                        <div class="courseR">
                            <div class="course-previewR">
                                <h6>pdf</h6>
                                <h2>Research Papers</h2>
                                <a href="#">SLIIT CON 2021<i class="fas fa-chevron-rightR"></i></a>
                            </div>
                            <div class="course-infoR">
                                <h6>Research Paper Fee</h6>
                                <h2 className="title">Rs. {item.researchPaperAmount} </h2>
                                <button class="btnR" onClick={e => this.navigateToDeletePaperAmountPage(e, item._id)}>Delete</button>
                                <button class="btnR1" onClick={e => this.navigateToUpdatePaperAmountPage(e, item._id)}>Change Amount</button>
                            </div>
                        </div>
                    </div>
                 ))}
            </div>
            <Footer/>
            </div>
        )
    }
}
