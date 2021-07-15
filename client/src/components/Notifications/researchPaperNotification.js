/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import '../css/virajCSS2.css'
import axios from 'axios';
import HeaderResearcher from '../Header/HeaderResearcher';
import Footer from '../Footer/Footer';

export default class researchPaperNotification extends Component {
    /**Constructor for getting the records */
    constructor(props) {
        super(props);
        this.state = {
            researchNotify: [],
           
        }
    }
    /*This method is to retreive all the research paper notifications related to a user*/ 
    componentDidMount() {
        axios.get(`http://localhost:5000/researcherNotification/get/${localStorage.getItem("researcherPhone")}`)
        .then(response => {
            this.setState({researchNotify : response.data });
        })
    }

    render() {
        return (
            <div>
                <HeaderResearcher/>
            <div className="bodyRN">
                 {this.state.researchNotify.length > 0 && this.state.researchNotify.map((item, index) => (
                    <div key={index} class="courses-containerRN">
                        <div class="courseRN">
                            <div class="course-previewRN">
                                <h6>Research Paper</h6>
                                <h2>Notifications</h2>
                                <a href="#">SLIIT CON 2021<i class="fas fa-chevron-rightRN"></i></a>
                            </div>
                            <div class="course-infoRN">
                                <h6>{item.date}</h6>
                                <h2 className="title">{item.researchMessage} </h2>    
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
