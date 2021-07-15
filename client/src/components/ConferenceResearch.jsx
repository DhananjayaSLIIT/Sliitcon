/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import Services from "../services/services";
import fileDownload from "js-file-download";
import {Card} from "react-bootstrap";
import HeaderNormal from './Header/HeaderNormal'
import Footer from './Footer/Footer'

export default class ConferenceResearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            researches:[]
        }
    }

    componentDidMount(){
        let name = this.props.match.params.name;
        Services.getConferencesResearch(name)//"TODO"need to replace as name
        .then(res=>{
            this.setState({researches:res.data.data});
            console.log(this.state.researches)
        }).catch(err=>{
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
                <HeaderNormal/>
            <div style={{padding:"10px" }}>
                <h1 style={{textAlign:"center",paddingTop:"10px",paddingBottom:"10px"}}>Research papers for conference</h1>
                {this.state.researches.length > 0 && this.state.researches.map((item, index)=>(
                    
                        <Card key={index} style={{justifyContent:'center',width:'100%'}}>
                        <Card.Header as="h5"style={{width:'100%'}}>{item.researchTitle}</Card.Header>
                        <Card.Body style={{background:"#F7F4C3", width:'100%',alignItems:'center'}}>
                            <Card.Text style={{fontSize:"small", color:'black'}}>
                                File name  :  {item.filename}<span className="tab"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <button type="submit" className="gridbtn"
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