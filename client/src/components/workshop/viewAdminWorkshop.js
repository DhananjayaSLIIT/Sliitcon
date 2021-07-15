import React, {Component} from 'react';
import axios from 'axios';
import '../../css/conf&ws.css';
import HeaderAdmin from '../Header/HeaderAdmin';
import Footer from '../Footer/Footer';

class viewAdminWorkshop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workshops: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/workshop/view/')
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
        <HeaderAdmin/>  
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

export default viewAdminWorkshop;