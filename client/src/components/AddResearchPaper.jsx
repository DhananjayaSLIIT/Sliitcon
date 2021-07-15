/* eslint-disable array-callback-return */
import React, {Component} from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button} from 'react-bootstrap';
import Select from 'react-select';
import Services from '../services/services';
import HeaderResearcher from './Header/HeaderResearcher';
import Footer from './Footer/Footer';

export default class AddResearchPaper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            researchTitle: "",
            conference: "",
            researchEmail: localStorage.getItem("researcherEmail"),
            researchPhone: localStorage.getItem("researcherPhone"),
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
        this.setState({conference:event.label});
    }

    onFileChangeHandler= (event) => {
        this.setState({file:event.target.files[0]});
    }

    componentDidMount() {
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
            })
    }

    onSubmitHandler = async (e) =>{
        e.preventDefault();
        let research = {
            researchTitle: this.state.researchTitle,
            conference: this.state.conference,
            researchEmail:this.state.researchEmail,
            researchPhone:this.state.researchPhone,
            reviewerStatus:this.state.reviewerStatus
        }

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

                            Services.addResearch(formData).then(res=>{
                                for (const value of formData.values()) {
                                    console.log(value);
                                }
                                console.log(research);
                            }).catch(err =>{
                                console.error(new Error(err));
                            });
                        }else{
                            //alert("Phone number empty !");
                        }
                    }else{
                        //alert("Email address empty !");
                    }
                }else{
                    alert("Conference fields empty !");
                }
            }else{
                //alert("Research title empty !");
            }
        }else{
            //alert("Choose a file to upload !");
        }
<<<<<<< HEAD
=======
        window.location.reload(false);
>>>>>>> 4ce0d41... Final AF Commit
    }

    render() {
        return (
            <div>
                 <HeaderResearcher/>
                 <main id="register">
            <div className="login-container" style={{ marginTop:'2%'}}>
                <Form style={{background:'white', width:'100%' , padding:'5%'}}> 
                    <br/>
                    <h1 style={{textAlign:"center"}}>Add research paper</h1>
                    <br/>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Research title</Form.Label>
                        <Form.Control type="text" placeholder="Enter research title" name="researchTitle"
                                      value={this.state.researchTitle} onChange={this.onChangeHandler} required/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Conference</Form.Label>
                        <Select
                            className="basic-single" classNamePrefix="select" name="conference" options={this.state.options}
                            placeholder="Select conference" onChange={this.onConferenceSelect} required
                        />
                    </Form.Group>

                    <Form.Group controlId="formFileMultiple" className="mb-3">
                        <Form.Label>Upload research paper</Form.Label>
                        <Form.Control type="file" name="file"
                        onChange={(e) => this.onFileChangeHandler(e)} required/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="researchEmail" readOnly
                                      value={this.state.researchEmail} onChange={this.onChangeHandler} required/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPhone">
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control type="number" placeholder="Enter phone number" name="researchPhone" readOnly
                                      value={this.state.researchPhone} onChange={this.onChangeHandler} required/>
                    </Form.Group>
                    <Button className='btnSubmit' variant="primary" type="submit" onClick={this.onSubmitHandler}>
                        Submit
                    </Button>
                    
                </Form>
                <br/>
            </div>
            </main>
            <Footer/>
            </div>
        );
    }
}