import React, {Component} from 'react';
import Services from "../services/services";
import {Card} from "react-bootstrap";
import fileDownload from "js-file-download";
import HeaderAdmin from "./Header/HeaderAdmin";
import Footer from "./Footer/Footer";

export default class ViewAllPayedResearchPapers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            researchPapers:[]
        }
    }

    componentDidMount(){
        Services.getAllPayed()
            .then(res =>{
                this.setState({researchPapers:res.data.data});
                console.log(res.data.data);
            })
            .catch(err =>{
                console.log(err);
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

    render() {
        return (
            <div>
                <HeaderAdmin/>
            <div style={{padding:"10px"}}>
                <h1 style={{textAlign:"center",paddingTop:"10px",paddingBottom:"10px"}}>Paid research papers</h1>
                {this.state.researchPapers.length > 0 && this.state.researchPapers.map((item, index)=>(
                    <Card key={index}>
                        <Card.Header as="h5">{item.researchTitle}</Card.Header>
                        <Card.Body style={{background:"#F7F4C3"}}>
                            <Card.Text style={{fontSize:"medium" , color:'black'}}>
                                Email address  :  {item.researchEmail}<span className="tab"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                Phone number  :  {item.researchPhone}<br/>
                                Payment  :  {item.researchPayment}<br/>
                                {/*TODO:*/}
                                {item.reviewerStatus}<br/><br/>
                                <button type="submit" style={{float:"left" , background:"peru" , borderRadius:"5px" , border:'none', color:'white'}}
                                        onClick={e => this.navigateDownloadPage(e, item.path, item.filename)}>Download
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
