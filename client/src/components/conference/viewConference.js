import React, {Component} from 'react';
import axios from 'axios';
import '../../css/conf&ws.css';
import dateformat from 'dateformat';
import HeaderEditor from '../Header/HeaderEditor';
import Footer from '../Footer/Footer';

class viewConference extends Component {
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

  navigateUpdatePage(e, confName) {
    window.location = `/updateConf/${confName}`
  }

  navigateDeletePage(e, confName) {
    window.location = `/deleteConf/${confName}`
  }

  myFunction() {
    var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchBar");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }      
  }
}


  render() {
    return (
      <div>
        <HeaderEditor/>
        <div className="container"><br/>
          <h1 id="ConfH"><u>VIEW CONFERENCE DETAILS</u></h1><br/>

          <form className="form-inline row">
                                    <input className="form-control col" id="searchBar" onKeyUp={this.myFunction} type="search" placeholder="Search" style={{marginLeft:"11px", marginRight:"11px"}} aria-label="Search"/>
                                   
                                </form>
          <table id="myTable" className="table table-striped table-hover tableCSS">
            <thead>
              <tr>
                <th>Conference Name</th>
                <th>Conference Venu</th>
                <th>Conference Date</th>
                <th>Register Fee</th>
                <th>Admin Status</th>
                <th>Edit</th>
                <th>Delete</th>
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
                <td><button id="vTablebtn" onClick={e => this.navigateUpdatePage(e, item.conferenceName)}>Update</button></td>
                <td><button id="vTablebtn" onClick={e => this.navigateDeletePage(e, item.conferenceName)}>Delete</button></td>
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

export default viewConference;