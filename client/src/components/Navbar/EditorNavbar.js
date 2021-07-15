/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import '../../css/navbar.css'

const EditorNavbar = () =>{

    return (
        <div className="navbar">
            <a href="/editorhome"  >Home</a>
            <div className="navbar-right">
                
                <a href="/addConf">Add Conferences</a>
                <a href="/viewConf">View Conferences</a>
            </div>
        </div>
    )

}

export default EditorNavbar;