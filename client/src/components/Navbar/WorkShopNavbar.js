/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import '../../css/navbar.css'

const WorkShopNavbar = () =>{

    return (
        <div className="navbar">
            <a href="/workshophome"  >Home</a>
            <div className="navbar-right">
                
                <a href="/addWS">Add Work Shop</a>
                <a href="/viewWS">View Work Shop</a>
                <a href="/notification-WorkShop/:contactNumber">Notifications</a>

                <a href={`/workshopdata/${localStorage.getItem("workShopEmail")}`}>Profile</a>
            </div>
        </div>
    )

}

export default WorkShopNavbar;