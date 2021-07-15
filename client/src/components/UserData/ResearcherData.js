/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import HeaderResearcher from '../Header/HeaderResearcher';
import Footer from '../Footer/Footer';
import React , { Component } from 'react';
import axios from 'axios';

export default class ResearcherData extends Component {

    constructor(props){
        super(props);

        this.state = {
            researcher:{}
        };
    }

    componentDidMount(){

        axios.get(`http://localhost:5000/researcher/researcherdatas/${localStorage.getItem("researcherEmail")}`).then((res) =>{
           
        if(res.data.success){
                this.setState({
                    researcher:res.data.researcher,
                });
                console.log(this.state.researcher)
                
            }
        })
    }

    render(){

        const { _id,researcherTopic, researcherName, researcherEmail, researcherPhone, researcherQualifications }= this.state.researcher;
        localStorage.setItem("researcherId", _id);
        localStorage.setItem("researcherPhone", researcherPhone);
        return (
            <div>
                <HeaderResearcher/>
            <div className="read-details">
                <h1 style={{textAlign:'center'}}><u>{researcherTopic}</u></h1>
                <hr/>

                <dl className="row">
                    <dt className="col-sm-3">Researcher's Name</dt>
                    <dd className="col-sm-9">{researcherName}</dd>

                    <dt className="col-sm-3">Researcher's Email</dt>
                    <dd className="col-sm-9">{researcherEmail}</dd>

                    <dt className="col-sm-3">Researcher's Contact</dt>
                    <dd className="col-sm-9">{researcherPhone}</dd>

                    <dt className="col-sm-3">Qualification Details</dt>
                    <dd className="col-sm-9">{researcherQualifications}</dd>
                </dl>
                <a className="btn btn-warning" href={`/researcherdataedit/${localStorage.getItem("researcherId")}`}>
                                <i className="fas fa-edit"></i>&nbsp; Edit
                </a>

            </div>
            <Footer/>
            </div>
        )
    }
}
