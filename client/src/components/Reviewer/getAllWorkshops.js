/* eslint-disable no-dupe-class-members */
import React, { Component } from 'react'
import '../css/virajCSS1.css'
import axios from 'axios';
import fileDownload from 'js-file-download';
import Footer from '../Footer/Footer';
import HeaderReviewer from '../Header/HeaderReviewer';

export default class getAllWorkshops extends Component {
    /**Constructor for getting the records */
    constructor(props) {
        super(props);
        this.state = {
            workshops: []
        }
    }
    /**This method is to retrieve all the work shops. Viwed by the reveiwer */
    componentDidMount() {
        axios.get('http://localhost:5000/workshop/view/')
        .then(response => {
          this.setState({ workshops: response.data.data })
        })
      }
     /**This method is to navigate to the deleteWorkshop page */
    navigateToDeleteWorkshopPage(e, workshopTopic) {
        window.location = `/delete-workshopReviewer/${workshopTopic}`
    }
    /**This method is to navigate to the approveWorkshop page */
    navigateToApproveWorkshopPage(e, workshopTopic) {
        window.location = `/approve-workshopPage/${workshopTopic}`
    }
    /**This method is to navigate to the rejectWorkshop page */
    navigateToRejectWorkshopPage(e, workshopTopic) {
        window.location = `/reject-workshopPage/${workshopTopic}`
    }
    /**This method is to navigate to the download page */
    navigateToWorkshopDownloadPage(e, filePath,workshopFile) {
        e.preventDefault();
        axios.get(`http://localhost:5000/workshop/downloadWS/${filePath}`,{responseType: 'blob',})
            .then(response => {     
            fileDownload(response.data, workshopFile)
                alert("Workshop is Downloaded!!!")
            })
            .catch(error => {
                alert(error.message)
            })
    }

    render() {
        return (
            <div>
                <HeaderReviewer/>
            <div className="container"><br/>
                <h1 id="ConfH"><u>VIEW ALL WORKSHOPS</u></h1><br/>
                <table>
                    <thead>
                        <tr>
                            <th scope="col">Workshop Topic</th>
                            <th scope="col">Conference</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Status</th>
                            <th scope="col">View</th>
                            <th scope="col">Approve</th>
                            <th scope="col">Reject</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.workshops.length > 0 && this.state.workshops.map((item, index) => (
                            <tr key={index}>
                                <td>{item.workshopTopic}</td>
                                <td>{item.conference}</td>
                                <td>{item.email}</td>
                                <td>{item.contactNumber}</td>
                                <td>{item.reviewerStatus}</td>
                                <td><button id="vTablebtn" onClick={e => this.navigateToWorkshopDownloadPage(e, item.filePath,item.workshopFile)} >View</button></td>
                                <td><button id="vTablebtn" onClick={e => this.navigateToApproveWorkshopPage(e, item.workshopTopic)}>Approve</button></td>
                                <td><button id="vTablebtn" onClick={e => this.navigateToRejectWorkshopPage(e, item.workshopTopic)}>Reject</button></td>
                                <td><button id="vTablebtn" onClick={e => this.navigateToDeleteWorkshopPage(e, item.workshopTopic)}>Delete</button></td>
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
