/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import HeaderAdmin from '../Header/HeaderAdmin';
import Footer from '../Footer/Footer';
import  React from 'react';
import axios from 'axios';

export default class ResearcherDetails extends React.Component{
    constructor(props){
        super(props);

        this.state =  {
            researchers:[]
        };
    }

componentDidMount(){
    this.getResearchers();
}

getResearchers(){
    axios.get('http://localhost:5000/researcher/researchers').then(res => {
        if(res.data.success){
            this.setState({
                researchers:res.data.existingresearchers
            });

            console.log(this.state.researchers);

        }
    })
}

onDelete = (id) =>{
    axios.delete(`http://localhost:5000/researcher/deleteresearcher/${id}`).then((res) =>{
        alert("Deleted Successfully...!");
        this.getResearchers();
    })
}

filterData(researchers, searchKey){
    const result = researchers.filter((researcher) =>
        researcher.researcherTopic.toLowerCase().includes(searchKey) ||
        researcher.researcherName.toLowerCase().includes(searchKey) ||
        researcher.researcherEmail.toLowerCase().includes(searchKey)
    )

    this.setState({researchers:result})
}

handleSearch = (e) =>{
    const searchKey = e.currentTarget.value
    axios.get('http://localhost:5000/researcher/researchers').then(res => {
        if(res.data.success){
            this.filterData(res.data.existingresearchers, searchKey)
        }
    })
}

render(){
    return (
        <div>
            <HeaderAdmin/>
        <div className="read-details">
        <h1 style={{textAlign:'center', textDecoration:'underline'}}>Researcher's Details</h1>
            <div className="row">
                <div className="col-lg-3 mt-2 mb-2">
                    <input
                        className="form-control"
                        type="search"
                        placeholder="Search"
                        name="searchQuery"
                        onChange={this.handleSearch}
                    >
                    </input>
                </div><hr/>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Topic</th>
                        <th scope="col">Researcher's Name</th>
                        <th scope="col">Researcher's Email</th>
                        <th scope="col">Researcher's Contact</th>
                        <th scope="col">Qualifications</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {this.state.researchers.map((researchers,index) => (
                    <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{researchers.researcherTopic}</td>
                        <td>{researchers.researcherName}</td>
                        <td>{researchers.researcherEmail}</td>
                        <td>{researchers.researcherPhone}</td>
                        <td>{researchers.researcherQualifications}</td>
                        <td>
                            <a className="btn btn-warning" href={`/researcheredit/${researchers._id}`}>
                                <i className="fas fa-edit"></i>&nbsp; Edit
                            </a>
                            &nbsp;
                            <a className="btn btn-danger" href="#" onClick={() => this.onDelete(researchers._id)}>
                                <i className="fas fa-trash-alt"></i>&nbsp; Delete
                            </a>
                        </td>
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
