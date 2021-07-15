import React, { Component } from 'react'
import '../css/virajCSS1.css'
import axios from 'axios';
import HeaderAdmin from '../Header/HeaderAdmin';
import Footer from '../Footer/Footer';

export default class getConferenceAttendees extends Component {
    /**Constructor for getting the records */
    constructor(props) {
        super(props);
        this.state = {
            attendeePayment: []
        }
    }
    /**This method is to retreive all the attendees who paid and got registered to the conference- this is viewed by Admin */
    componentDidMount() {
        axios.get('http://localhost:5000/conferenceAttendeePay/')
        .then(response => {
            this.setState({attendeePayment : response.data });
        })
    }
    myFunction() {
        var input, filter, table, tr, td, i, txtValue;
      input = document.getElementById("searchBar");
      filter = input.value.toUpperCase();
      table = document.getElementById("myTable");
      tr = table.getElementsByTagName("tr");
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
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
    /**This method is to navigate to the deleteConferenceAttendee page */
    navigateToDeleteConferenceAttendeePage(e, contactNumber) {
        window.location = `/delete-ConferenceAttendee/${contactNumber}`;
    }

    render() {
        return (
            <div>
                <HeaderAdmin/>
            <div className="container"><br/>
                <h1 id="ConfH"><u>VIEW REGISTERED ATTENDEES</u></h1><br/>
                <form className="form-inline row">
                                    <input className="form-control col" id="searchBar" onKeyUp={this.myFunction} type="search" placeholder="Search" style={{marginLeft:"25px", marginRight:"25px"}} aria-label="Search"/>
                                   
                                </form>
                                <br/>
                <table id="myTable">
                    <thead>
                        <tr>
                            <th scope="col">Contact Number</th>
                            <th scope="col">Email</th>
                            <th scope="col">Conference Name</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.attendeePayment.length > 0 && this.state.attendeePayment.map((item, index) => (
                            <tr key={index}>
                                <td>{item.contactNumber}</td>
                                <td>{item.email}</td>
                                <td>{item.conferenceName}</td>
                                <td><button id="vTablebtn" onClick={e => this.navigateToDeleteConferenceAttendeePage(e, item.contactNumber)}>Delete</button></td>
                            </tr>
                        ))}  
                    </tbody>
                </table>
            </div>
            <br/>
            <Footer/> 
            </div>
        )
    }
}
