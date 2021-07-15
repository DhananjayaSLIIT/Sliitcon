import React, {Component} from 'react';
import axios from 'axios';
import '../../css/conf&ws.css';
import fileDownload from 'js-file-download';
import HeaderNormal from '../Header/HeaderNormal';
import Footer from '../Footer/Footer';

class viewConfWorkshop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workshops: []
    }
  }

  componentDidMount() {
    const conferenceName = this.props.match.params.confName;
    axios.get(`http://localhost:5000/workshop/viewConfWS/${conferenceName}`)
    .then(response => {
      this.setState({ workshops: response.data.data })
    })
  }

  navigateDownloadPage(e, filePath, name) {
    e.preventDefault();
    axios.get(`http://localhost:5000/workshop/downloadWS/${filePath}`,{responseType: 'blob',})
    .then(response => {     
      fileDownload(response.data, name)
      alert("Workshop is Downloaded!!!")
    })
    .catch(error => {
      alert(error.message)
    })
  }

  render() {
    return (
      <div>
        <HeaderNormal/>
        <div className="container">
          <h1 id="ConfH">VIEW {this.props.match.params.confName} WORKSHOPS</h1><br/>
          <div class="grid-container">
            {this.state.workshops.length > 0 && this.state.workshops.map((item, index) => (          
              <div class="grid-item" key={index}>
                <div class="info">
                  <h6>POWERPOINT FILE</h6>
                  <h3 id="xtra">{item.workshopTopic}</h3>
                  <button type="submit" class="gridbtn" onClick={e => this.navigateDownloadPage(e, item.filePath, item.workshopFile)}>Download</button>
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

export default viewConfWorkshop;