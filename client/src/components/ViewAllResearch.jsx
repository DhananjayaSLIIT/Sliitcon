/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import Services from "../services/services";
// import 'bootstrap/dist/css/bootstrap.min.css';
import {Card,Form,Button,Modal} from 'react-bootstrap';
import fileDownload from 'js-file-download';
import HeaderResearcher from './Header/HeaderResearcher';
import Footer from './Footer/Footer';


export default class ViewAllResearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userid:localStorage.getItem(['researcherId']), //should take from local storage
            payment:'',
            researchPapers:[]
        }
        this.navigateDownloadPage = this.navigateDownloadPage.bind(this);
        this.onUpdateClick = this.onUpdateClick.bind(this);
    }

    componentDidMount(){
        Services.getResearchPapersByUserId(this.state.userid)
        .then(res =>{
            this.setState({researchPapers:res.data.data});
            console.log(res.data.data);
        })
        .catch(err =>{
            console.log(err);
        })
        Services.getPayment()
        .then(res=>{
            this.setState({payment:res.data.data});
            console.log("max"+this.state.payment);
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

    onUpdateClick(event, researchId){
        this.props.history.push(`/update-research/${researchId}`);
    }

    render() {
        return (
            <div>
                 <HeaderResearcher/>
            <div style={{padding:"10px", alignItems:'center'}}>
                <h1 style={{textAlign:"center",paddingTop:"10px",paddingBottom:"10px"}}>Pending research papers</h1>
                {this.state.researchPapers.length > 0 && this.state.researchPapers.map((item, index)=>(
                    <Card key={index}>
                        <Card.Header as="h5">{item.researchTitle}</Card.Header>
                        <Card.Body style={{background:"#F7F4C3", width:'100%',alignItems:'center'}}>
                            <Card.Text style={{fontSize:"medium",color:"black"}}>
                                Conference  :  {item.conference}<br/>
                                Email address  :  {item.researchEmail}<br/>
                                Phone number  :  {item.researchPhone}<br/>
                                Payment  :  none<br/>
                                {/*TODO:*/}
                                {item.reviewerStatus}<br/><br/>
                                <button type="submit"  style={{float:"left" , background:"peru" , borderRadius:"5px" , border:'none', color:'white'}}
                                        onClick={e => this.navigateDownloadPage(e, item.path, item.filename)}>Download
                                </button>
                                <button style={{float:"right" , background:"peru" , borderRadius:"5px" ,  border:'none', color:'white'}} onClick={event => this.onUpdateClick(event, item._id)}>Update</button>
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
