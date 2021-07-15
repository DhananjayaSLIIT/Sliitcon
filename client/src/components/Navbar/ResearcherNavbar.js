/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import '../../css/navbar.css'

const ResearcherNavbar = () =>{

    return (
        <div className="navbar">
            <a href="/researcherhome"  >Home</a>
            <div className="navbar-right">
                
                <a href="/add-research">Add Research</a>
                <a href="/user-researches">View Researches</a>
                <a href={`/notification-ResearchPaper/${localStorage.getItem("researcherPhone")}`}>Notifications</a>
                
                <a href={`/approved-researches/${localStorage.getItem("researcherEmail")}`}>Approved Researches</a>
                <a href={`/researcherdata/${localStorage.getItem("researcherEmail")}`}>Profile</a>
            </div>
        </div>
    )

}

export default ResearcherNavbar;