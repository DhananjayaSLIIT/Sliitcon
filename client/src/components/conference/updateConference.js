import React, {Component} from 'react';
import '../../css/conf&ws.css';
import '../../css/form.css';
import axios from 'axios';
import HeaderEditor from '../Header/HeaderEditor';
import Footer from '../Footer/Footer';

const initialState = {
  confName: '',
  confVenu: '',
  confDate: '',
  confRegfee: 0
}

class updateConference extends Component {
  constructor(props) {
    super(props);
    this.onChangeConferenceName = this.onChangeConferenceName.bind(this);
    this.onChangeConferenceVenu = this.onChangeConferenceVenu.bind(this);
    this.onChangeConferenceDate = this.onChangeConferenceDate.bind(this);
    this.onChangeRegisterFee = this.onChangeRegisterFee.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = initialState;
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/conference/get/${this.props.match.params.confName}`)
    .then(response => {
      this.setState({ 
        conferenceName: response.data.data.conferenceName,
        venu: response.data.data.venu,
        conferenceDate:response.data.data.conferenceDate,
        registerFee: response.data.data.registerFee })
    })
    .catch(error => {
      alert(error.message)
    })
  }

  onChangeConferenceName(e){
    this.setState({ conferenceName: e.target.value })
  }

  onChangeConferenceVenu(e){
    this.setState({ venu: e.target.value })
  }

  onChangeConferenceDate(e){
    this.setState({ conferenceDate: e.target.value })
  }

  onChangeRegisterFee(e){
    this.setState({ registerFee: e.target.value })
  }
  
  onSubmit(e) {
    e.preventDefault();
    let conference = {
      conferenceName: this.state.conferenceName,
      venu: this.state.venu,
      date: this.state.conferenceDate,
      registerFee: this.state.registerFee
    }
    console.log('DATA TO SEND', conference);
    axios.put(`http://localhost:5000/conference/update/${this.props.match.params.confName}`, conference)
    .then(response => {
      window.location = '/viewConf'
      alert('Data successfully Updated')
    })
    .catch(error => {
      console.log(error.message);
      alert(error.message)
    })
  }
  render() {
    return (
      <div>
        <HeaderEditor/>
        <div className="container">
        <form className="form" onSubmit={this.onSubmit}>
          <h2 id="ConfH">UPDATE CONFERENCE DETAILS</h2><br/>
          <div className="form-group row">
            <label className="col-sm-4">Conference Name</label>
            <div className="col-sm-7">
              <input type="text" className="form-control" id="confName" name="confName" value={this.state.conferenceName} onChange={this.onChangeConferenceName} placeholder="Enter Conference Name" autoComplete="off" required/>
            </div>
          </div><br/>
          <div className="form-group row">
            <label className="col-sm-4">Conference Venu</label>
            <div className="col-sm-7">
              <input type="text" className="form-control"  id="confVenu" name="confVenu" value={this.state.venu} onChange={this.onChangeConferenceVenu} placeholder="Enter Conference Venu" autoComplete="off" required/>
            </div>
          </div><br/>
          <div className="form-group row">
            <label className="col-sm-4">Conference Date</label>
            <div className="col-sm-7">
              <input type="Date" className="form-control"  id="confDate" name="confDate" value={this.state.conferenceDate} onChange={this.onChangeConferenceDate} placeholder="Enter Conference Date" required/>
            </div>
          </div><br/>
          <div className="form-group row">
            <label className="col-sm-4">Register Fee</label>
            <div className="col-sm-7">
              <input type="Number" className="form-control"  id="confRegfee" name="confRegfee" value={this.state.registerFee} onChange={this.onChangeRegisterFee} placeholder="Enter Conference Register Fee" required/>
            </div>
          </div><br/>
          <hr/>
          <div className="action-wrapper text-center">
            <div className="action-btn form-group">
                <button className="form-btn btn mb-2" id="confBtns" type="submit" >Confirm Update</button>
            </div>
          </div>
        </form>
      </div>
      <Footer/>
    </div>
    )
  }
}
  export default updateConference;