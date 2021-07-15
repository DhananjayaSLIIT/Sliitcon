/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import HeaderAdmin from '../Header/HeaderAdmin';
import Footer from '../Footer/Footer';
import  React from 'react';
import axios from 'axios';

export default class EditorDetails extends React.Component{
    constructor(props){
        super(props);

        this.state =  {
            editors:[]
        };
    }

componentDidMount(){
    this.getEditors();
}

getEditors(){
    axios.get('http://localhost:5000/editor/editors').then(res => {
        if(res.data.success){
            this.setState({
                editors:res.data.existingeditors
            });

            console.log(this.state.editors);

        }
    })
}

onDelete = (id) =>{
    axios.delete(`http://localhost:5000/editor/deleteeditor/${id}`).then((res) =>{
        alert("Deleted Successfully...!");
        this.getEditors();
    })
}

filterData(editors, searchKey){
    const result = editors.filter((editor) =>
        editor.editorName.toLowerCase().includes(searchKey) ||
        editor.editorEmail.toLowerCase().includes(searchKey)
    )

    this.setState({editors:result})
}

handleSearch = (e) =>{
    const searchKey = e.currentTarget.value
    axios.get('http://localhost:5000/editor/editors').then(res => {
        if(res.data.success){
            this.filterData(res.data.existingeditors, searchKey)
        }
    })
}

render(){
    return (
        <div>
            <HeaderAdmin/>
        <div className="read-details">
        <h1 style={{textAlign:'center', textDecoration:'underline'}}>Editor's Details</h1>
            <div className="row">
                <div className="col-lg-3 mt-2 mb-2">
                    <a className="btn btn-success" style={{marginBottom: '5px',width:'100%'}} href="/editorregister">
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
                        <th scope="col">Editor's Name</th>
                        <th scope="col">Editor's Email</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {this.state.editors.map((editors,index) => (
                    <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{editors.editorName}</td>
                        <td>{editors.editorEmail}</td>
                        <td>
                            <a className="btn btn-warning" href={`/editoredit/${editors._id}`}>
                                <i className="fas fa-edit"></i>&nbsp; Edit
                            </a>
                            &nbsp;
                            <a className="btn btn-danger" href="#" onClick={() => this.onDelete(editors._id)}>
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
