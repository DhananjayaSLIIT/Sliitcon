import React, { Component} from 'react'
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
class addConference extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = initialState;
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault();
    let conference = {
      confName: this.state.confName,
      confVenu: this.state.confVenu,
      confDate: this.state.confDate,
      confRegfee: this.state.confRegfee
    }
    console.log('DATA TO SEND', conference);
    axios.post('http://localhost:5000/conference/add/', conference)
    .then(response => {
      alert('Data successfully inserted!!!')
      window.location='/viewConf'
    })
    .catch(error => {
      alert(error.message)
    })
  }
  render() {
    return (
      <div>
        <HeaderEditor/>
        <div className="container">
          <form className="form" onSubmit={this.onSubmit}>
            <h2 id="ConfH">ADD CONFERENCE DETAILS</h2><br/>
            <div className="form-group row">
              <label className="col-sm-4">Conference Name</label>
              <div className="col-sm-7">
                <input type="text" className="form-control" id="confName" name="confName" value={this.state.confName} onChange={this.onChange} placeholder="Enter Conference Name" autoComplete="off" required/>
              </div>
            </div><br/>
            <div className="form-group row">
              <label className="col-sm-4">Conference Venu</label>
              <div className="col-sm-7">
                <input type="text" className="form-control"  id="confVenu" name="confVenu" value={this.state.confVenu} onChange={this.onChange} placeholder="Enter Conference Venu" autoComplete="off" required/>
              </div>
            </div><br/>
            <div className="form-group row">
              <label className="col-sm-4">Conference Date</label>
              <div className="col-sm-7">
                <input type="Date" className="form-control"  id="confDate" name="confDate" value={this.state.confDate} onChange={this.onChange} placeholder="Enter Conference Date" required/>
              </div>
            </div><br/>
            <div className="form-group row">
              <label className="col-sm-4">Register Fee</label>
              <div className="col-sm-7">
                <input type="Number" className="form-control" style={{width:'100%'}}  id="confRegfee" name="confRegfee" value={this.state.confRegfee} onChange={this.onChange} placeholder="Enter Conference Register Fee" required/>
              </div>
            </div><br/>
            <hr/>
            <div className="action-wrapper text-center">
              <div className="action-btn form-group">
                  <button className="form-btn btn mb-2" id="confBtns" type="submit" >Add Conference</button>
              </div>
            </div>
          </form>
        </div>
        <Footer/>
      </div>  
    )
  }
}

export default addConference;