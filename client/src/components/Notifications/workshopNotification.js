/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import '../css/virajCSS2.css'
import axios from 'axios';
import HeaderWorkshop from '../Header/HeaderWorkshop';
import Footer from '../Footer/Footer';

export default class workshopNotification extends Component {
     /**Constructor for getting the records */
    constructor(props) {
        super(props);
        this.state = {
            workshopNotify: []
        }
    }
    /*This method is to retreive all the work shop notifications related to a user*/ 
    componentDidMount() {
        axios.get(`http://localhost:5000/workshopNotification/get/${localStorage.getItem('workShopPhone')}`)
        .then(response => {
            this.setState({workshopNotify : response.data });
        })
    }

    render() {
        return (
            <div>
                <HeaderWorkshop/>
            <div className="bodyRN"><br/>
            <h1 id="ConfH"><u>Notifications</u></h1><br/>
                {this.state.workshopNotify.length > 0 && this.state.workshopNotify.map((item, index) => (
                <div key={index} class="courses-containerRN">
                    <div class="courseRN">
                        <div class="course-previewRN" >
                            <h6>Workshop</h6>
                            <h2>Notifications</h2>
                            <a href="#">SLIIT CON 2021<i class="fas fa-chevron-rightRN"></i></a>
                        </div>
                        <div class="course-infoRN">
                            <h6>{item.date}</h6>
                            <h2 className="title">{item.workShopMessage} </h2>
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
