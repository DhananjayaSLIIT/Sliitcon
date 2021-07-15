/* eslint-disable array-callback-return */
import React, {Component} from 'react';
import Services from "../services/services";
import {Button, Form} from "react-bootstrap";
import Select from "react-select";
import HeaderResearcher from './Header/HeaderResearcher';
import Footer from './Footer/Footer';

export default class UpdateResearchPaper extends Component {
    constructor(props) {
        super(props);
        this.state ={
            researchId:this.props.match.params.id,
            researchTitle: "",
            conference: "",
            researchEmail: "",
            researchPhone: "",
            reviewerStatus:"Pending",
            file:'',
            currentID:localStorage.getItem('researcherId'),
            conferences: [],
            options: []
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onConferenceSelect = this.onConferenceSelect.bind(this);
        this.onFileChangeHandler = this.onFileChangeHandler.bind(this);
    }

    onChangeHandler(event){
        this.setState({[event.target.name]:event.target.value});
    }

    onConferenceSelect(event){
        this.setState({conference:event.lable});
    }

    onFileChangeHandler= (event) => {
        this.setState({file:event.target.files[0]});
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        Services.getResearchById(id)
        .then(res =>{
            this.setState({
                researchId:res.data.data.researchId,
                researchTitle:res.data.data.researchTitle,
                conference:res.data.data.conference,
                researchEmail:res.data.data.researchEmail,
                researchPhone:res.data.data.researchPhone,
            });
        })
        .catch(err =>{
            console.log(err);
        })

        Services.getConferences()
            .then(res=>{
                this.setState({conferences: res.data.data},() =>{
                    let data = [];
                    this.state.conferences.map((item, index) =>{
                        let conference = {
                            value:item._id,
                            label:item.conferenceName
                        }
                        data.push(conference)
                    });
                    this.setState({options:data});
                });
            })
            .catch(err=>{
                console.log(err);
            });
    }

    onSubmitHandler = async (e) =>{
        e.preventDefault();
        if(this.state.file){
            if(this.state.researchTitle){
                if(this.state.conference){
                    if(this.state.researchEmail){
                        if(this.state.researchPhone){
                            const formData = new FormData();

                            formData.append('file', this.state.file);
                            formData.append('researchTitle',this.state.researchTitle);
                            formData.append('conference',this.state.conference);
                            formData.append('researchEmail',this.state.researchEmail);
                            formData.append('researchPhone',this.state.researchPhone);
                            formData.append('reviewerStatus',this.state.reviewerStatus);
                            formData.append('currentID',this.state.currentID);

                            console.log("front-end u : "+this.props.match.params.id);
                            Services.updateResearchPaper(this.props.match.params.id,formData).then(res=>{
                                for (const value of formData.values()) {
                                    console.log(value);
                                }
                                this.props.history.push('/user-researches');
                            }).catch(err =>{
                                console.error(new Error(err));
                            });
                        }else{
                            alert("Phone number empty !");
                        }
                    }else{
                        alert("Email address empty !");
                    }
                }else{
                    alert("Conference fields empty !");
                }
            }else{
                alert("Research title empty !");
            }
        }else{
            alert("Choose a file to upload !");
        }
<<<<<<< HEAD
=======
        this.props.history.push('/user-researches')
>>>>>>> 4ce0d41... Final AF Commit
    }

    render() {
        return (
            <div>
                 <HeaderResearcher/>
                 <main id="register">
            <div className="login-container" style={{ marginTop:'2%'}}>
                <Form style={{background:'white', width:'100%' , padding:'5%'}}> 
                    <h1 style={{textAlign:"center"}}>Update research paper</h1>
                    <br/>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Research title</Form.Label>
                        <Form.Control type="text" placeholder="Enter research title" name="researchTitle"
                                      value={this.state.researchTitle} onChange={this.onChangeHandler}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Conference</Form.Label>
                        <input type="text" className="form-control" id="conference" name="conference" value={this.state.conference} readOnly/>
                        <Select
                            className="basic-single" classNamePrefix="select" name="conference" options={this.state.options}
                            placeholder="Select conference" onChange={this.onConferenceSelect}
                        />
                    </Form.Group>

                    <Form.Group controlId="formFileMultiple" className="mb-3">
                        <Form.Label>Upload research paper</Form.Label>
                        <Form.Control type="file" name="file"
                                      onChange={(e) => this.onFileChangeHandler(e)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="researchEmail"
                                      value={this.state.researchEmail} onChange={this.onChangeHandler}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPhone">
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control type="number" placeholder="Enter phone number" name="researchPhone"
                                      value={this.state.researchPhone} onChange={this.onChangeHandler}/>
                    </Form.Group>
                    <Button className='btnSubmit' variant="primary" type="submit" onClick={this.onSubmitHandler}>
                        Submit
                    </Button>
                </Form>
                </div>
            </main>
                <Footer/>
            </div>
            
        );
    }
}
