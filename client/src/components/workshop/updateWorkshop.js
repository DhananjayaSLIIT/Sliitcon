/* eslint-disable react/no-direct-mutation-state */
/* eslint-disable array-callback-return */
import React, {Component} from 'react';
import '../../css/conf&ws.css';
import '../../css/form.css';
import axios from 'axios';
import Select from 'react-select';
import HeaderWorkshop from '../Header/HeaderWorkshop';
import Footer from '../Footer/Footer';

const initialState = {
  workshopTopic: '',
  email: '',
  contactNumber:'',
  conference: '',
  file:null,
  fileName:'',
  fileNameOld:'',
  errors:{},
  errorStatus:true
}

class updateWorkshop extends Component {
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

    axios.get(`http://localhost:5000/workshop/get/${this.props.match.params.topic}`)
    .then(response => {
      this.setState({ 
        workshopTopic: response.data.data.workshopTopic,
        selectedConference: response.data.data.conference,
        email:response.data.data.email,
        contactNumber: response.data.data.contactNumber,
        fileName:response.data.data.workshopFile,
        fileNameOld:response.data.data.workshopFile,
        oldPath:response.data.data.filePath
      })
    })
    .catch(error => {
      alert(error.message)
    })
  }

  onConferenceSelect(e) {
    this.setState({ selectedConference: e.value });
  }

  onFileChange(e) {
    this.setState({ file: e.target.files[0] });
    this.setState({ fileName: e.target.files[0].name });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (!pattern.test(this.state.email)) {
      this.state.errorStatus = false;
      alert("Enter Valid Email Address!!!")
    }

    if (this.state.errorStatus === true) {
      
      let formData = new FormData ();
      if(this.state.fileName.trim() !== this.state.fileNameOld.trim()){
        formData.append('workshopTopic',this.state.workshopTopic);
        formData.append('conference',this.state.selectedConference);
        formData.append('email',this.state.email);
        formData.append('contactNumber',this.state.contactNumber);
        formData.append('file',this.state.file);
        formData.append('oldPath',this.state.oldPath);

        axios.put(`http://localhost:5000/workshop/update/${this.props.match.params.topic}`, formData, config)
        .then(response => {
          window.location = '/viewWS'
          alert('Workshop successfully Updated!!!')
        })
        .catch(error => {
          console.log(error.message);
          alert(error.message)
        })
      }
      else{
        let workshop = {
          workshopTopic: this.state.workshopTopic,
          conference: this.state.selectedConference,
          email: this.state.email,
          contactNumber: this.state.contactNumber
        }

        axios.put(`http://localhost:5000/workshop/updateWF/${this.props.match.params.topic}`, workshop)
        .then(response => {
          window.location = '/viewWS'
          alert('Data successfully Updated!!!')
        })
        .catch(error => {
          console.log(error.message);
          alert(error.message)
        })
      }  
    }
    
    
    
    
  }
  render() {
    return (
      <div>
        <HeaderWorkshop/>
        <div className="container">
          <form className="form" onSubmit={this.onSubmit}>
            <h2 id="ConfH">UPDATE WORKSHOP DETAILS</h2><br/>
            <div className="form-group row">
              <label className="col-sm-4">Workshop Topic</label>
              <div className="col-sm-7">
                <input type="text" className="form-control" id="workshopTopic" name="workshopTopic" value={this.state.workshopTopic} onChange={this.onChange} placeholder="Enter Workshop Topic" autoComplete="off" required/>
              </div>
            </div><br/>
            <div className="form-group row">
              <label className="col-sm-4">Email Address</label>
              <div className="col-sm-7">
                <input type="text" className="form-control" id="email" name="email" value={this.state.email} onChange={this.onChange} placeholder="Enter Your Email" autoComplete="off" required/>
              </div>
            </div><br/>
            <div className="form-group row">
              <label className="col-sm-4">Contact Number</label>
              <div className="col-sm-7">
                <input type="number" className="form-control" id="contactNumber" name="contactNumber" value={this.state.contactNumber} onChange={this.onChange} autoComplete="off" required/>
              </div>
            </div><br/>
            <div className="form-group row">
              <label className="col-sm-4">Confernece</label>
              <div className="col-sm-7">
                <input type="text" className="form-control" id="conference" name="conference" value={this.state.selectedConference} readOnly/>
                <Select options={this.state.options} onChange={this.onConferenceSelect} className="basic-single"/>
              </div>
            </div><br/>
            <div className="form-group row">
              <label className="col-sm-4">Workshop Template</label>
              <div className="col-sm-7">
                <input type="text" className="form-control" id="file" name="file" value={this.state.fileName} readOnly/>
                <input type="File" className="form-control" id="file" name="file" onChange={this.onFileChange}/>
              </div>
            </div><br/>
            <hr/>
            <div className="action-wrapper text-center">
              <div className="action-btn form-group">
                  <button className="form-btn btn mb-2" id="confBtns" type="submit" >Update Workshop</button>
              </div>
            </div>
          </form>
        </div>
        <Footer/>
      </div>  
    )
  }
}
  export default updateWorkshop;