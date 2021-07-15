/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import HeaderReviewer from '../Header/HeaderReviewer';
import Footer from '../Footer/Footer';
import SlideImage from '../SlideImage/SlideImage';
import logo1 from '../../img/card1.png'
import logo2 from '../../img/card2.png'
import logo3 from '../../img/card3.png'
import logo4 from '../../img/card4.png'



const ReviewerHome =()=>{
    return (
      <div>
         <HeaderReviewer/>
         <SlideImage/> 
            <div className="main-container">
            <div className="home-container">


<div className="col-1-lg ml-11">
        <div className="card" style={{width:"100%", height:"300px", display: "flex",justifyContent: "center",alignItems: "center", borderRadius:"0"}}>
        <div className="container-fluid">
            <div className="row">
            <div className="col-md-6 col-sm-12 ">
            <img className="card-img" src={logo1} alt="Logo" />
            </div>
            <div className="col-md-6 col-sm-12 ">
                <br/><h2 style={{color: "#000", textAlign:"center"}}><b>SLIITCon </b></h2><br/>
                <h5>SLIIT Con 2021 is a online conference tool, where it it designed in the aim to provide the SLIIT students to educate themselves, to interact themselves so they can broder their knowledge space.</h5><br/>
                <center><button className="btn btn-warning"><a href="#" style={{color: "black",fontWeight:"bold", textDecoration:"none"}}>Go TO</a></button></center>
            </div>
            </div>
        </div>
        </div>
    </div>
    <br/>

    <div className="col-1-lg ml-11">
        <div className="card" style={{width:"100%", height:"300px", display: "flex",justifyContent: "center",alignItems: "center", borderRadius:"0"}}>
        <div className="container-fluid">
            <div className="row">
            <div className="col-md-6 col-sm-12 ">
            <br/><h2 style={{color: "#000", textAlign:"center"}}><b>SLIITCon</b></h2><br/>
                <h5>SLIIT Con 2021 provides facilities for students and all the attendees to go through the availabe conferences and view them, download research papers, workshops etc. </h5><br/>
                <center><button className="btn btn-warning"><a href="#" style={{color: "black",fontWeight:"bold", textDecoration:"none"}}>Go TO</a></button></center>
            
            </div>
            <div className="col-md-6 col-sm-12 ">
            <img className="card-img" src={logo2} alt="Logo" />
                </div>
            </div>
        </div>
        </div>
    </div>
    <br/>

    <div className="col-1-lg ml-11">
        <div className="card" style={{width:"100%", height:"300px", display: "flex",justifyContent: "center",alignItems: "center", borderRadius:"0"}}>
        <div className="container-fluid">
            <div className="row">
            <div className="col-md-6 col-sm-12 ">
            <img className="card-img" src={logo3} alt="Logo" />
            </div>
            <div className="col-md-6 col-sm-12 ">
                <br/><h2 style={{color: "#000", textAlign:"center"}}><b>SLIITCon</b></h2><br/>
                <h5>SLIIT Con 2021 makes way for the researchers, fresh researchers to upload their research papers, so that the young eagerly waiting students can increase their knowledge to a wide space.</h5><br/>
                <center><button className="btn btn-warning"><a href="#" style={{color: "black",fontWeight:"bold", textDecoration:"none"}}>Go TO</a></button></center>
            </div>
            </div>
        </div>
        </div>
    </div>
    <br/>

    <div className="col-1-lg ml-11">
        <div className="card" style={{width:"100%", height:"300px", display: "flex",justifyContent: "center",alignItems: "center", borderRadius:"0"}}>
        <div className="container-fluid">
            <div className="row">
            <div className="col-md-6 col-sm-12 ">
            <h2 style={{color: "#000", textAlign:"center"}}><b>SLIITCon </b></h2>
                <h5>SLIIT Con 2021 makes way for the workshop conductors to present their workshops and make way for students to download them and grab the knowladeg opportunity they get.
SLIIT Con 2021 will be held at physically at SLIIT from 20th of July till 30th of July, and it will be a great opportunity for students to get registered to conferences so that they can gain more knowledge and develop their career.</h5><br/>
                <center><button className="btn btn-warning"><a href="#" style={{color: "black",fontWeight:"bold", textDecoration:"none"}}>Go TO</a></button></center>
            
            </div>
            <div className="col-md-6 col-sm-12 ">
            <img className="card-img" src={logo4} alt="Logo" />
                </div>
            </div>
        </div>
        </div>
    </div>
    <br/>

</div>

            
            </div>


            
          <Footer/> 
      </div> 
    );
};
 export default ReviewerHome;