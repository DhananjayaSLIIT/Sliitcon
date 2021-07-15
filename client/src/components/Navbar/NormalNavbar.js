/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import '../../css/navbar.css'

const NormalNavbar = () =>{

    return (
        <div className="navbar">
            <a href="/"  >Home</a>
            <div className="navbar-right">
                
                <a href="/viewAttendConf">Conferences</a>
                <a href="/create-attendeePayment">Conference Registration</a>
            </div>
        </div>
    )

}

export default NormalNavbar;