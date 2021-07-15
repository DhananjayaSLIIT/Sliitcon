/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import HeaderAdmin from '../Header/HeaderAdmin';
import Footer from '../Footer/Footer';
import  React from 'react';
import axios from 'axios';

export default class ReviewerDetails extends React.Component{
    constructor(props){
        super(props);

        this.state =  {
            reviewers:[]
        };
    }

componentDidMount(){
    this.getReviewers();
}

getReviewers(){
    axios.get('http://localhost:5000/reviewer/reviewers').then(res => {
        if(res.data.success){
            this.setState({
                reviewers:res.data.existingreviewers
            });

            console.log(this.state.reviewers);

        }
    })
}

onDelete = (id) =>{
    axios.delete(`http://localhost:5000/reviewer/deletereviewer/${id}`).then((res) =>{
        alert("Deleted Successfully...!");
        this.getReviewers();
    })
}

filterData(reviewers, searchKey){
    const result = reviewers.filter((reviewer) =>
        reviewer.reviewerName.toLowerCase().includes(searchKey) ||
        reviewer.reviewerEmail.toLowerCase().includes(searchKey)
    )

    this.setState({reviewers:result})
}

handleSearch = (e) =>{
    const searchKey = e.currentTarget.value
    axios.get('http://localhost:5000/reviewer/reviewers').then(res => {
        if(res.data.success){
            this.filterData(res.data.existingreviewers, searchKey)
        }
    })
}

render(){
    return (
        <div>
            <HeaderAdmin/>
        <div className="read-details">
            <div className="row">
            <h1 style={{textAlign:'center', textDecoration:'underline'}}>Reviewer's Details</h1>
                <div className="col-lg-3 mt-2 mb-2">
                <a className="btn btn-success" style={{marginBottom: '5px',width:'100%'}} href="/reviewerregister">
                                <i className="fas fa-trash-alt"></i>&nbsp; ADD
                    </a>
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
                        <th scope="col">Reviewer's Name</th>
                        <th scope="col">Reviewer's Email</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {this.state.reviewers.map((reviewers,index) => (
                    <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{reviewers.reviewerName}</td>
                        <td>{reviewers.reviewerEmail}</td>
                        <td>
                            <a className="btn btn-warning" href={`/revieweredit/${reviewers._id}`}>
                                <i className="fas fa-edit"></i>&nbsp; Edit
                            </a>
                            &nbsp;
                            <a className="btn btn-danger" href="#" onClick={() => this.onDelete(reviewers._id)}>
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
