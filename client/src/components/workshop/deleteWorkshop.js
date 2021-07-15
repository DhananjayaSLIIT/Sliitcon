import React, {Component} from 'react';
import '../../css/conf&ws.css';
import '../../css/form.css';
import axios from 'axios';
import HeaderWorkshop from '../Header/HeaderWorkshop';
import Footer from '../Footer/Footer';

class deleteWorkshop extends Component {
  constructor(props) {
    super(props);
    this.state = {
        workshop: []
      }
  }

  navigateDeleteConference(e) {
    e.preventDefault();
    axios.delete(`http://localhost:5000/workshop/delete/${this.props.match.params.topic}/${this.props.match.params.path}/${this.props.match.params.file}`)
    .then(response => {
      if (response.status === 200){
        window.location = '/viewWS'
        alert("Workshop is Deleted!!!")
      }
      else{
        window.location = '/viewWS'
        alert("Failed to Delete Workshop!!!")
      }
    })
    .catch(error => {
      alert(error.message)
    })
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/workshop/get/${this.props.match.params.topic}`)
    .then(response => {
      this.setState({ workshop: response.data.data })
    })
    .catch(error => {
      alert(error.message)
    })
  }

  render() {
    return (
      <div>
        <HeaderWorkshop/>
        <div className="container">
          <form className="form" onSubmit={this.onSubmit}>
            <h2 id="ConfH">DELETE WORKSHOP DETAILS</h2><br/>
            <div className="form-group row">
              <label className="col-sm-4">Workshop Topic</label>
              <div className="col-sm-7">
                <input type="text" className="form-control" id="workshopTopic" name="workshopTopic" value={this.state.workshop.workshopTopic} readOnly/>
              </div>
            </div><br/>
            <div className="form-group row">
              <label className="col-sm-4">Email Address</label>
              <div className="col-sm-7">
                <input type="text" className="form-control" id="email" name="email" value={this.state.workshop.email} readOnly/>
              </div>
            </div><br/>
            <div className="form-group row">
              <label className="col-sm-4">Contact Number</label>
              <div className="col-sm-7">
                <input type="number" className="form-control" id="contactNumber" name="contactNumber" value={this.state.workshop.contactNumber} readOnly/>
              </div>
            </div><br/>
            <div className="form-group row">
              <label className="col-sm-4">Confernece</label>
              <div className="col-sm-7">
              <input type="text" className="form-control" id="conference" name="conference" value={this.state.workshop.conference} readOnly/>
              </div>
            </div><br/>
            <div className="form-group row">
              <label className="col-sm-4">Workshop Template</label>
              <div className="col-sm-7">
              <input type="text" className="form-control" id="file" name="file" value={this.state.workshop.workshopFile} readOnly/>
              </div>
            </div><br/>
            <hr/>
            <div className="action-wrapper text-center">
              <div className="action-btn form-group">
                  <button className="form-btn btn mb-2" id="confBtns" type="submit" onClick={e => this.navigateDeleteConference(e)}>Confirm Delete</button>
              </div>
            </div>
          </form>
        </div>
        <Footer/>
      </div>  
    )
  }
}
  export default deleteWorkshop;