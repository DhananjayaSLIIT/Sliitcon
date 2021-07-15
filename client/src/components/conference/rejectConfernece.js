import React, {Component} from 'react';
import axios from 'axios';
import '../../css/conf&ws.css';
import dateformat from 'dateformat';
import HeaderAdmin from '../Header/HeaderAdmin';
import Footer from '../Footer/Footer';

class rejectConference extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conference: []
    }
  }

  navigateRejectConference(e, confName) {
    e.preventDefault();
    axios.put(`http://localhost:5000/conference/updateFaStatus/${this.props.match.params.confName}`)
    .then(response => {
      if(response.status===200){
        window.location='/adminViewConf'
        alert('Conference is Rejected!!!')
      }
      else{
        alert('Error!!!')
      }
    })
    .catch(error => {
      alert(error.message)
    })
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/conference/get/${this.props.match.params.confName}`)
    .then(response => {
      this.setState({ conference: response.data.data })
    })
    .catch(error => {
      alert(error.message+" "+this.props.match.params.confName)
    })
  }
  
  

  render() {
    return (
      <div>
        <HeaderAdmin/>
        <div className="container">
          <form className="form">
            <h2 id="ConfH">REJECT CONFERENCE</h2><br/>
            <div className="form-group row">
              <label className="col-sm-4">Conference Name</label>
              <div className="col-sm-7">
              <input type="text" className="form-control" id="confName" name="confName" value={this.state.conference.conferenceName} readOnly/>
              </div>
            </div><br/>
            <div className="form-group row">
              <label className="col-sm-4">Conference Venu</label>
              <div className="col-sm-7">
              <input type="text" className="form-control" id="confVenu" name="confVenu" value={this.state.conference.venu} readOnly/>
              </div>
            </div><br/>
            <div className="form-group row">
              <label className="col-sm-4">Conference Date</label>
              <div className="col-sm-7">
              <input type="text" className="form-control" id="confDate" name="confDate" value={dateformat(this.state.conference.conferenceDate,"dddd-dS-mmm-yyyy")} readOnly/>
              </div>
            </div><br/>
            <div className="form-group row">
              <label className="col-sm-4">Register Fee</label>
              <div className="col-sm-7">
              <input type="Number" className="form-control" id="confRegfee" name="confRegfee" value={this.state.conference.registerFee} readOnly/>
              </div>
            </div><br/>
            <div className="form-group row">
              <label className="col-sm-4">Status</label>
              <div className="col-sm-7">
              <input type="text" className="form-control" id="confStatus" name="confStatus" value={this.state.conference.adminStatus} readOnly/>
              </div>
            </div><br/>
            <hr/>
            <div className="action-wrapper text-center">
              <div className="action-btn form-group">
                <button className="form-btn btn mb-2" id="confBtns" type="submit" onClick={e => this.navigateRejectConference(e, this.state.conference.conferenceName)}>Confirm Reject</button>
              </div>
            </div>
          </form>
        </div>
      <Footer/>
      </div>
    )
  }
}

export default rejectConference;