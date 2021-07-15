/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import '../../css/navbar.css'

const AdminNavbar = () =>{

    return (
        <div className="navbar">
            <a href="/adminhome"  >Home</a>
            <div className="navbar-right">
                
                <a href="/adminViewConf">Conferences</a>
                <a href="/viewAdminWS">WorkShops</a>
                <a href="/get-all-payed">Researches</a>
                <a href="/create-rPaperAmount">Set Research Fee</a>
                <a href="/get-allRPayment/">View Research Fee</a>
                <a href="/get-ConferenceAttendeePayment/">Attendees</a>
                <a href="admindetails">Admins</a>
                <a href="editordetails">Editors</a>
                <a href="researcherdetails">Researchers</a>
                <a href="reviewerdetails">Reviewers</a>
                <a href="workshopdetails">Workshops</a>
                
                {/* <div className="dropdown">
                    <a className ="dropbtn">User Details &nbsp;
                    <i className="fa fa-caret-down"></i>
                    </a>
                    <div className="dropdown-content">
                    <a href="admindetails">Admin Details</a>
                    <a href="editordetails">Editor Details</a>
                    <a href="researcherdetails">Researcher Details</a>
                    <a href="reviewerdetails">Reviewer Details</a>
                    <a href="workshopdetails">Workshop Details</a>
                </div>
                </div> */}
                 
            </div>
        </div>
    )

}

export default AdminNavbar;