import React, { Component } from 'react'
import '../css/virajCSS1.css'
import axios from 'axios';
import Footer from '../Footer/Footer';
import HeaderReviewer from '../Header/HeaderReviewer';
import fileDownload from 'js-file-download';
import Services from '../../services/services'

export default class getAllResearchPapers extends Component {
    /**Constructor for getting the records */
    constructor(props) {
        super(props);
        this.state = {
            allresearchpapers: []
        }
    }
    /**This method is to retrieve all the research papers. Viwed by the reveiwer */
    componentDidMount() {
        axios.get('http://localhost:5000/api/v1/getResearchAll')
        .then(response => {
            this.setState({allresearchpapers : response.data.data} );
            console.log(response.data)

        })
    }

    /**This method is to navigate to the deleteResarchPaper page */
    navigateToDeleteResearchPaperPage(e, researchTitle) {
        window.location = `/delete-rPaperReviewer/${researchTitle}`
    }
    /**This method is to navigate to the approveResearchPaper page */
    navigateToApproveResearchPaperPage(e, researchTitle) {
        window.location = `/approve-ResearchPaper/${researchTitle}`
    }
    /**This method is to navigate to the rejectResearchPaper page */
    navigateToRejectResearchPaperPage(e, researchTitle) {
        window.location = `/reject-ResearchPaper/${researchTitle}`
    }

    navigateDownloadPage(e, filePath, name) {
        console.log(filePath);
        console.log(name);
        e.preventDefault();
        Services.getDownload(e, filePath, name).then(response=>{
            fileDownload(response.data, name)
            alert("Research paper is Downloaded!!!")
        }).catch(error => {
            alert(error.message)
        })
    }

    render() {
        return (
            <div>
                <HeaderReviewer/>
            <div className="container"><br/>
                <h1 id="ConfH"><u>VIEW ALL RESEARCH PAPERS</u></h1><br/>
                <table>
                    <thead>
                        <tr>
                            <th scope="col">Research Topic</th>
                            <th scope="col">Conference</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Status</th>
                            <th scope="col">view</th>
                            <th scope="col">Approve</th>
                            <th scope="col">Reject</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.allresearchpapers.length > 0 && this.state.allresearchpapers.map((allresearchpapers, index) => (
                            <tr key={index}>
                                <td>{allresearchpapers.researchTitle}</td>
                                <td>{allresearchpapers.conference}</td>
                                <td>{allresearchpapers.researchEmail}</td>
                                <td>{allresearchpapers.researchPhone}</td>
                                <td>{allresearchpapers.reviewerStatus}</td>
                                <td><button id="vTablebtn" onClick={e => this.navigateDownloadPage(e, allresearchpapers.path, allresearchpapers.filename)}>Download</button></td>
                                <td><button id="vTablebtn" onClick={e => this.navigateToApproveResearchPaperPage(e, allresearchpapers.researchTitle)}>Approve</button></td>
                                <td><button id="vTablebtn" onClick={e => this.navigateToRejectResearchPaperPage(e, allresearchpapers.researchTitle)}>Reject</button></td>
                                <td><button id="vTablebtn" onClick={e => this.navigateToDeleteResearchPaperPage(e, allresearchpapers.researchTitle)}>Delete</button></td>
                            </tr>
                        ))}  
                    </tbody>
                </table>
            </div>
            <Footer/>
            </div>
        )
    }
}
