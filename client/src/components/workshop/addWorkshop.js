/* eslint-disable react/no-direct-mutation-state */
/* eslint-disable array-callback-return */
import React, { Component} from 'react'
import '../../css/conf&ws.css';
import '../../css/form.css';
import axios from 'axios';
import Select from 'react-select';
import HeaderWorkshop from '../Header/HeaderWorkshop';
import Footer from '../Footer/Footer';

const initialState = {
  workshopTopic: '',
  email: localStorage.getItem('workShopEmail'),
  contactNumber:localStorage.getItem('workShopPhone'),
  conference: '',
  file:null,
  errors:{},
  errorStatus:true
}
class addWorkshop extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onConferenceSelect=this.onConferenceSelect.bind(this);
    this.onFileChange=this.onFileChange.bind(this);
    this.state = initialState;
  }

  componentDidMount() {
    axios.get('http://localhost:5000/conference/view')
    .then(response => {
      this.setState({ conference: response.data.data }, () => {
        let data = [];
        this.state.conference.map((item, index) => {
          let conference = {
            value: item.conferenceName,
            label: item.conferenceName
          }
          data.push(conference)
        });
        this.setState({ options: data });
      })
    })
  }

  onConferenceSelect(e) {
    this.setState({ selectedConference: e.value });
  }

  onFileChange(e) {
    this.setState({ file: e.target.files[0] });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.state.errorStatus=true;
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (!pattern.test(this.state.email)) {
      this.state.errorStatus = false;
      alert("Enter Valid Email Address!!!")
    }

    var phoneno = /^\d{10}$/;
    if(!this.state.contactNumber.match(phoneno)){
      this.state.errorStatus = false;
      alert("Enter Valid Phone Number!!!")
    }

    if (this.state.errorStatus === true) {
      let formData = new FormData ();
      formData.append('workshopTopic',this.state.workshopTopic);
      formData.append('conference',this.state.selectedConference);
      formData.append('email',this.state.email);
      formData.append('contactNumber',this.state.contactNumber);
      formData.append('file',this.state.file);
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      
      console.log('DATA TO SEND', formData);
      axios.post('http://localhost:5000/workshop/add/', formData, config)
      .then(response => {
        window.location = '/viewWS'
        alert('Data successfully inserted!!!')
      })
      .catch(error => {
        console.log(error.message);
        alert(error.message)
      })
    }  
  }
  render() {
    return (
      <div>
        <HeaderWorkshop/>
        <div className="container"><br/>
          <form className="form" >
            <h2 id="ConfH">ADD WORKSHOP DETAILS</h2><br/>
            <div className="form-group row">
              <label className="col-sm-4">Workshop Topic</label>
              <div className="col-sm-7">
                <input type="text" className="form-control" id="workshopTopic" name="workshopTopic" value={this.state.workshopTopic} onChange={this.onChange} placeholder="Enter Workshop Topic" autoComplete="off" required/>
              </div>
            </div><br/>
            <div className="form-group row">
              <label className="col-sm-4">Email Address</label>
              <div className="col-sm-7">
                <input type="text" readOnly className="form-control"  id="email" name="email" value={this.state.email} onChange={this.onChange} placeholder="Enter Your Email Address" autoComplete="off" required/>
              </div>
            </div><br/>
            <div className="form-group row">
              <label className="col-sm-4">Contact Number</label>
              <div className="col-sm-7">
                <input type="Number" readOnly className="form-control" id="contactNumber" name="contactNumber" value={this.state.contactNumber} onChange={this.onChange} autoComplete="off" required/>
              </div>
            </div><br/>
            <div className="form-group row">
              <label className="col-sm-4">Confernece</label>
              <div className="col-sm-7">
                <Select options={this.state.options} onChange={this.onConferenceSelect} className="basic-single"/>
              </div>
            </div><br/>
            <div className="form-group row">
              <label className="col-sm-4">Workshop Template</label>
              <div className="col-sm-7">
                <input type="File" className="form-control" id="file" name="file" onChange={this.onFileChange} required/>
              </div>
            </div><br/>
            <hr/>
            <div className="action-wrapper text-center">
              <div className="action-btn form-group">
                  <button className="form-btn btn mb-2" id="confBtns" type="submit" onClick={this.onSubmit}>Add Workshop</button>
              </div>
            </div>
          </form>
        </div>
        <Footer/>  
      </div>  
    )
  }
}

export default addWorkshop;