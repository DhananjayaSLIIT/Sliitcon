/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import '../../css/navbar.css'

const ReviewerNavbar = () =>{

    return (
        <div className="navbar">
            <a href="/reviewerhome"  >Home</a>
            <div className="navbar-right">
                
                <a href="/get-allResearchPapers/">Research Papers</a>
                <a href="/get-allWorkshops/">Work Shops</a>
            </div>
        </div>
    )

}

export default ReviewerNavbar;