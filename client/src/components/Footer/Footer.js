/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import '../../css/styles.css'
import '../../css/footer.css'


const Footer = () => {

return (
<footer>
  <div className="footer-top">
    <div className="footer-container">
      <div className="footer-row">

        <div className="col segment-two">
          <h2>About Us</h2>
          <br/>
          <p>Department of Software Engineering</p>
          <p>Faculty of Computing</p>
          <p>SLIIT</p>
          <p>Malambe</p>
        </div>

        <div className="col segment-three">
          <h2>Follow Us</h2>
          <br/>
            <p>Please follow us on Social media Profiles in order to keep updated.</p>
            <br/>
            <a href="#"><i className="fa fa-facebook"></i></a>
            <a href="#"><i className="fa fa-instagram"></i></a>
            <a href="#"><i className="fa fa-twitter"></i></a>
        </div>

        <div className="col segment-four">
          <h2>Contact Us</h2>
          <br/>
            <p>Get in touch with us.</p>
            <ul>
               <li><a href="#">Email Address - sliitcon2021@gmail.com</a></li>
               <li><a href="#">Tel - 0777 251 804</a></li>
               <li><a href="#">Tel - 0777 390 561</a></li>
             </ul>
        </div>

      </div>
      </div>
    </div>

  <div className="footer-bottom">
      <center><p>&copy; Sliitcon.com | Designed By SDVY Developers (Pvt) Ltd.</p></center>
  </div>

</footer>
);

};

export default Footer;