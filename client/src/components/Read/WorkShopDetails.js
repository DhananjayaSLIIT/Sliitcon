/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import HeaderAdmin from '../Header/HeaderAdmin';
import Footer from '../Footer/Footer';
import  React from 'react';
import axios from 'axios';

export default class WorkShopDetails extends React.Component{
    constructor(props){
        super(props);

        this.state =  {
            workshops:[]
        };
    }

componentDidMount(){
    this.getWorkshops();
}

getWorkshops(){
    axios.get('http://localhost:5000/workshop/workshops').then(res => {
        if(res.data.success){
            this.setState({
                workshops:res.data.existingWorkshops
            });

            console.log(this.state.workshops);

        }
    })
}

onDelete = (id) =>{
    axios.delete(`http://localhost:5000/workshop/deleteworkshop/${id}`).then((res) =>{
        alert("Deleted Successfully...!");
        this.getWorkshops();
    })
}

filterData(workshops, searchKey){
    const result = workshops.filter((workshop) =>
        workshop.workShopTitle.toLowerCase().includes(searchKey) ||
        workshop.workShopName.toLowerCase().includes(searchKey) ||
        workshop.workShopEmail.toLowerCase().includes(searchKey)
    )

    this.setState({workshops:result})
}

handleSearch = (e) =>{
    const searchKey = e.currentTarget.value
    axios.get('http://localhost:5000/workshop/workshops').then(res => {
        if(res.data.success){
            this.filterData(res.data.existingWorkshops, searchKey)
        }
    })
}

render(){
    return (
        <div>
            <HeaderAdmin/>
        
        <div className="read-details">
        <h1 style={{textAlign:'center', textDecoration:'underline'}}>WorkShop's Details</h1>
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
                        <th scope="col">Title</th>
                        <th scope="col">Presenter's Name</th>
                        <th scope="col">Presenter's Email</th>
                        <th scope="col">Presenter's Contact</th>
                        <th scope="col">Description</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {this.state.workshops.map((workshops,index) => (
                    <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{workshops.workShopTitle}</td>
                        <td>{workshops.workShopName}</td>
                        <td>{workshops.workShopEmail}</td>
                        <td>{workshops.workShopPhone}</td>
                        <td>{workshops.workShopDescription}</td>
                        <td>
                            <a className="btn btn-warning" href={`/workshopedit/${workshops._id}`}>
                                <i className="fas fa-edit"></i>&nbsp; Edit
                            </a>
                            &nbsp;
                            <a className="btn btn-danger" href="#" onClick={() => this.onDelete(workshops._id)}>
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
