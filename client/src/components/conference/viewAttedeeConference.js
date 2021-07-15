import React, {Component} from 'react';
import axios from 'axios';
import '../../css/conf&ws.css';
import dateformat from 'dateformat';
import HeaderNormal from '../Header/HeaderNormal';
import Footer from '../Footer/Footer';

class viewAttendeeConference extends Component {
  constructor(props) {
    super(props);
    this.state = {
        conferences: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/conference/viewAc/')
    .then(response => {
      this.setState({ conferences: response.data.data })
    })
  }

  navigateWorkshopPage(e, confName) {
    window.location = `/viewConfWS/${confName}`
  }

  navigateResearchesPage(e, name) {
    window.location = `/conf-research/${name}`
  }

  render() {
    return (
      <div>
        <HeaderNormal/>
        <div className="container"><br/>
          <h1 id="ConfH"><u>VIEW CONFERENCES</u></h1><br/>
          <div class="grid-container">
            {this.state.conferences.length > 0 && this.state.conferences.map((item, index) => (          
              <div class="grid-item" key={index}>
                <div class="info">
                  <h6>POWERPOINT FILE</h6>
                  <h3>{item.conferenceName}</h3>
                  <h4>Venu: {item.venu}</h4>
                  <h4>Date: {dateformat(new Date(item.conferenceDate),"dddd-dS-mmm-yyyy")}</h4>
                  <h4 id="xtra">Register Fee: {item.registerFee} LKR</h4>
                  <button type="submit" class="gridbtn" onClick={e => this.navigateWorkshopPage(e, item.conferenceName)}>Workshops</button>
                  <button type="submit" class="gridbtn2" onClick={e => this.navigateResearchesPage(e, item.conferenceName)}>Researches</button>
                </div>
              </div>  
            ))}  
          </div>
        </div>
        <Footer/>
      </div>  
    )
  }
}

export default viewAttendeeConference;