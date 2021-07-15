import React, {Component} from 'react';
import axios from 'axios';
import '../../css/conf&ws.css';
import HeaderWorkshop from '../Header/HeaderWorkshop';
import Footer from '../Footer/Footer';

class viewWorkshop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workshops: []
    }
  }

  componentDidMount() {
    const condEmail = localStorage.getItem("workShopEmail");
    axios.get(`http://localhost:5000/workshop/viewConductWS/${condEmail}`)
    .then(response => {
      this.setState({ workshops: response.data.data })
    })
  }

  navigateUpdatePage(e, topic) {
    window.location = `/updateWS/${topic}`
  }

  navigateDeletePage(e, topic,filePath) {
    window.location = `/deleteWS/${topic}/${filePath}`
  }

  render() {
    return (
      <div>
        <HeaderWorkshop/>
        <div className="container"><br/>
          <h1 id="ConfH"><u>VIEW WORKSHOP DETAILS</u></h1><br/>
          <table className="table table-striped table-hover tableCSS">
            <thead>
              <tr>
                <th>Workshop Topic</th>
                <th>Conference</th>
                <th>Email</th>
                <th>Contact Number</th>
                <th>Reviewer Status</th>
                <th>Workshop Template</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.workshops.length > 0 && this.state.workshops.map((item, index) => (
              <tr key={index}>
                <td>{item.workshopTopic}</td>
                <td>{item.conference}</td>
                <td>{item.email}</td>
                <td>{item.contactNumber}</td>
                <td>{item.reviewerStatus}</td>
                <td>{item.workshopFile}</td>
                <td><button id="vTablebtn" onClick={e => this.navigateUpdatePage(e, item.workshopTopic)}>Update</button></td>
                <td><button id="vTablebtn" onClick={e => this.navigateDeletePage(e, item.workshopTopic,item.filePath)}>Delete</button></td>
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

export default viewWorkshop;