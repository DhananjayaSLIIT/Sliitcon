/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import HeaderAdmin from '../Header/HeaderAdmin';
import Footer from '../Footer/Footer';
import  React from 'react';
import axios from 'axios';

export default class AdminDetails extends React.Component{
    constructor(props){
        super(props);

        this.state =  {
            admins:[]
        };
    }

componentDidMount(){
    this.getAdmins();
}

getAdmins(){
    axios.get('http://localhost:5000/admin/admins').then(res => {
        if(res.data.success){
            this.setState({
                admins:res.data.existingadmins
            });

            console.log(this.state.admins);

        }
    })
}

onDelete = (id) =>{
    axios.delete(`http://localhost:5000/admin/deleteadmin/${id}`).then((res) =>{
        alert("Deleted Successfully...!");
        this.getAdmins();
    })
}

filterData(admins, searchKey){
    const result = admins.filter((admin) =>
        admin.adminName.toLowerCase().includes(searchKey) ||
        admin.adminEmail.toLowerCase().includes(searchKey)
    )

    this.setState({admins:result})
}


handleSearch = (e) =>{
    const searchKey = e.currentTarget.value
    axios.get('http://localhost:5000/admin/admins').then(res => {
        if(res.data.success){
            this.filterData(res.data.existingadmins, searchKey)
        }
    })
}

render(){
    return (
        <div>
            <HeaderAdmin/>
        <div className="read-details">
            <div className="row">
            <br/>
            <h1 style={{textAlign:'center', textDecoration:'underline'}}>Admin's Details</h1>
                <div className="col-lg-3 mt-2 mb-2">
                <a className="btn btn-success" style={{marginBottom: '5px', width:'100%'}} href={"/adminregister"}>
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
                        <th scope="col">Admin's Name</th>
                        <th scope="col">Admin's Email</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {this.state.admins.map((admins,index) => (
                    <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{admins.adminName}</td>
                        <td>{admins.adminEmail}</td>
                        <td>
                            <a className="btn btn-warning" href={`/adminedit/${admins._id}`}>
                                <i className="fas fa-edit"></i>&nbsp; Edit
                            </a>
                            &nbsp;
                            <a className="btn btn-danger" href="#" onClick={() => this.onDelete(admins._id)}>
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
