/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import Services from '../services/services'
// import 'bootstrap/dist/css/bootstrap.min.css';
import {Card,Form,Button} from 'react-bootstrap';
import fileDownload from "js-file-download";
import HeaderResearcher from './Header/HeaderResearcher';
import Footer from './Footer/Footer';

export default class ViewApprovedResearchPapers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            researchEmail:localStorage.getItem('researcherEmail'), //should take from local storage
            payment:'',
            researchPapers:[]
        }
    }

    componentDidMount(){
        Services.getAllApproved(this.state.researchEmail)
            .then(res =>{
                this.setState({researchPapers:res.data.data});
                console.log(res.data.data);
            })
            .catch(err =>{
                console.log(err);
            })
            console.log("researchEmail "+this.state.researchEmail);
        Services.getPayment()
            .then(res=>{
                this.setState({payment:res.data.data});
                console.log("max"+this.state.payment);
            }).catch(error =>{
                console.log(error);
            }) 
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

    payNow(e, id, payment){
        Services.makePayment(id, payment)
        .then(response =>{
            alert("Payment Successful");
        })
        .catch(err =>{
            alert("Payment Unsuccessful");
        });
        console.log(id);
        console.log(payment);
    }

    render() {
        return (
            <div>
                <HeaderResearcher/>
            <div style={{padding:"10px"}}>
                <h1 style={{textAlign:"center",paddingTop:"10px",paddingBottom:"10px"}}>Approved Research papers</h1>
                {this.state.researchPapers.length > 0 && this.state.researchPapers.map((item, index)=>(
                    <Card key={index}>
                        <Card.Header as="h5">{item.researchTitle}</Card.Header>
                        <Card.Body style={{background:"#F7F4C3"}}>
                            <Card.Text style={{fontSize:"small" , color:'black'}}>
                                Email address  :  {item.researchEmail}<span className="tab"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                Phone number  :  {item.researchPhone}<br/>
                                Payment  :  {this.state.payment}<br/>
                                {/*TODO:*/}
                                {item.reviewerStatus}<br/><br/>
                                <button type="submit" style={{float:"left" , background:"peru" , borderRadius:"5px" , border:'none', color:'white'}}
                                        onClick={e => this.navigateDownloadPage(e, item.path, item.filename)}>Download file
                                </button>
                                <button style={{float:"right" , background:"peru" , borderRadius:"5px" ,  border:'none', color:'white'}} disabled={item.researchPayment}
                                    onClick={e => this.payNow(e, item._id, this.state.payment)}>Pay now
                                </button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </div>
            <Footer/>
            </div>
        );
    }
}
