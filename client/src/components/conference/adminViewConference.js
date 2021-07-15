import React, {Component} from 'react';
import axios from 'axios';
import '../../css/conf&ws.css';
import dateformat from 'dateformat';
import HeaderAdmin from '../Header/HeaderAdmin';
import Footer from '../Footer/Footer';

class adminViewConference extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conferences: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/conference/view/')
    .then(response => {
      this.setState({ conferences: response.data.data })
    })
  }

  navigateApprovePage(e, confName) {
    window.location = `/approveConf/${confName}`
  }

  navigateRejectPage(e, confName) {
    window.location = `/rejectConf/${confName}`
  }

  render() {
    return (
      <div>
        <HeaderAdmin/>
        <div className="container"><br/>
          <h1 id="ConfH"><u>VIEW CONFERENCE DETAILS</u></h1><br/>
          <table className="table table-striped table-hover tableCSS">
            <thead>
              <tr>
                <th>Conference Name</th>
                <th>Conference Venu</th>
                <th>Conference Date</th>
                <th>Register Fee</th>
                <th>Admin Status</th>
                <th>Approve</th>
                <th>Reject</th>
              </tr>
            </thead>
            <tbody>
              {this.state.conferences.length > 0 && this.state.conferences.map((item, index) => (
              <tr key={index}>
                <td>{item.conferenceName}</td>
                <td>{item.venu}</td>
                <td>{dateformat(new Date(item.conferenceDate),"dddd-dS-mmm-yyyy")}</td>
                <td>{item.registerFee} LKR</td>
                <td>{item.adminStatus}</td>
                <td><button id="vTablebtn" onClick={e => this.navigateApprovePage(e, item.conferenceName)}>Approve</button></td>
                <td><button id="vTablebtn" onClick={e => this.navigateRejectPage(e, item.conferenceName)}>Reject</button></td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default adminViewConference;