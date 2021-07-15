/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import HeaderWorkshop from '../Header/HeaderWorkshop';
import Footer from '../Footer/Footer';
import React , { Component } from 'react';
import axios from 'axios';

export default class WorkshopData extends Component {

    constructor(props){
        super(props);

        this.state = {
            workshop:{}
        };
    }

    componentDidMount(){

        axios.get(`http://localhost:5000/workshop/workshopdatas/${localStorage.getItem("workShopEmail")}`).then((res) =>{
           
        if(res.data.success){
                this.setState({
                    workshop:res.data.workshop,
                });
                console.log(this.state.workshop)
                
            }
        })
    }

    render(){

        const { _id,workShopTitle, workShopName, workShopEmail, workShopPhone,workShopDescription }= this.state.workshop;
        localStorage.setItem("workShopId", _id);
        localStorage.setItem("workShopPhone", workShopPhone);

        return (
            <div>
                <HeaderWorkshop/>
            <div className="read-details">
                <h1 style={{textAlign:'center'}}><u>{workShopTitle}</u></h1>
                <hr/>

                <dl className="row">
                    <dt className="col-sm-3">Presenter's Name</dt>
                    <dd className="col-sm-9">{workShopName}</dd>

                    <dt className="col-sm-3">Presenter's Email</dt>
                    <dd className="col-sm-9">{workShopEmail}</dd>

                    <dt className="col-sm-3">Presenter's Contact</dt>
                    <dd className="col-sm-9">{workShopPhone}</dd>
                    

                    <dt className="col-sm-3">Description about Workshop</dt>
                    <dd className="col-sm-9">{workShopDescription}</dd>
                </dl>

                <a className="btn btn-warning" href={`/workshopdataedit/${localStorage.getItem("workShopId")}`}>
                                <i className="fas fa-edit"></i>&nbsp; Edit
                </a>

            </div>
            <Footer/>
            </div>
        )
    }
}
