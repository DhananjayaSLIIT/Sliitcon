/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import NormalHome from './components/Home/NormalHome';
import AdminHome from './components/Home/AdminHome';
import EditorHome from './components/Home/EditorHome';
import ResearcherHome from './components/Home/ResearcherHome';
import ReviewerHome from './components/Home/ReviewerHome';
import WorkShopHome from './components/Home/WorkShopHome';

import AdminDetails from './components/Read/AdminDetails';
import AdminLogin from './components/Login/AdminLogin';
import AdminRegister from './components/Register/AdminRegister';
import AdminForgotpassword from './components/Forgotpassword/AdminForgotpassword';
import AdminResetpassword from './components/Resetpassword/AdminResetpassword';
import AdminEdit from './components/AdminSideEdit/AdminEdit';
import ResearcherEdit from './components/AdminSideEdit/ResearcherEdit';
import EditorEdit from './components/AdminSideEdit/EditorEdit';
import ReviewerEdit from './components/AdminSideEdit/ReviewerEdit';
import WorkshopEdit from './components/AdminSideEdit/WorkshopEdit';

import EditorDetails from './components/Read/EditorDetails';
import EditorLogin from './components/Login/EditorLogin';
import EditorRegister from './components/Register/EditorRegister';
import EditorForgotpassword from './components/Forgotpassword/EditorForgotpassword';
import EditorResetpassword from './components/Resetpassword/EditorResetpassword';

import ResearcherDetails from './components/Read/ResearcherDetails';
import ResearcherLogin from './components/Login/ResearcherLogin';
import ResearcherRegister from './components/Register/ResearcherRegister';
import ResearcherForgotpassword from './components/Forgotpassword/ResearcherForgotpassword';
import ResearcherResetpassword from './components/Resetpassword/ResearcherResetpassword';
import EditResearcher from './components/Edit/EditResearcher';
import ResearcherData from './components/UserData/ResearcherData';
import ResearcherDataEdit from './components/UserData/ResearcherDataEdit';

import ReviewerDetails from './components/Read/ReviewerDetails';
import ReviewerLogin from './components/Login/ReviewerLogin';
import ReviewerRegister from './components/Register/ReviewerRegister';
import ReviewerForgotpassword from './components/Forgotpassword/ReviewerForgotpassword';
import ReviewerResetpassword from './components/Resetpassword/ReviewerResetpassword';

import WorkShopDetails from './components/Read/WorkShopDetails';
import WorkShopLogin from './components/Login/WorkShopLogin';
import WorkShopRegister from './components/Register/WorkShopRegister';
import WorkShopForgotpassword from './components/Forgotpassword/WorkShopForgotpassword';
import WorkShopResetpassword from './components/Resetpassword/WorkShopResetpassword';
import EditWorkshop from './components/Edit/EditWorkshop';
import WorkshopData from './components/UserData/WorkshopData';
import WorkshopDataEdit from './components/UserData/WorkshopDataEdit';

import LoginPopup from './components/Popup/LoginPopup'
import RegisterPopup from './components/Popup/RegisterPopup'

//Viraj
import insertResearchPaperAmount from './components/ReasearchPaperAmount/insertResearchPaperAmount';
import insertConferenceAttendee from './components/ConferenceAttendeePayment/insertConferenceAttendee';
import updateResearchPaperAmount from './components/ReasearchPaperAmount/updateResearchPaperAmount';
import deleteResearchPaperAmount from './components/ReasearchPaperAmount/deleteResearchPaperAmount';
import deleteConferenceAttendee from './components/ConferenceAttendeePayment/deleteConferenceAttendee';
import getResearchPaperAmount from './components/ReasearchPaperAmount/getResearchPaperAmount';
import getConferenceAttendees from './components/ConferenceAttendeePayment/getConferenceAttendees';
import getAllWorkshops from './components/Reviewer/getAllWorkshops';
import deletedWorkshop from './components/Reviewer/deleteWorkshop';
import approveWorkshop from './components/Reviewer/approveWorkshop';
import rejectWorkshop from './components/Reviewer/rejectWorkshop';
import getAllResearchPapers from './components/Reviewer/getAllResearchPapers';
import deleteResearchPaper from './components/Reviewer/deleteResearchPaper';
import approveResearchPaper from './components/Reviewer/approveResearchPaper';
import rejectResearchPaper from './components/Reviewer/rejectResearchPaper';
import researchPaperNotification from './components/Notifications/researchPaperNotification';
import workshopNotification from './components/Notifications/workshopNotification';


//Yathushan
import addConference from './components/conference/addConference';
import viewConference from './components/conference/viewConference';
import updateConference from './components/conference/updateConference';
import deleteConference from './components/conference/deleteConference';
import adminViewConference from './components/conference/adminViewConference';
import approveConference from './components/conference/approveConference';
import rejectConference from './components/conference/rejectConfernece';
import addWorkshop from './components/workshop/addWorkshop';
import viewWorkshop from './components/workshop/viewWorkshop';
import viewAdminWorkshop from './components/workshop/viewAdminWorkshop';
import updateWorkshop from './components/workshop/updateWorkshop';
import deleteWorkshop from './components/workshop/deleteWorkshop';
import viewConfWorkshop from './components/workshop/viewConfWorkshop';
import viewAttendeeConference from './components/conference/viewAttedeeConference';

//Dananjaya
import AddResearchPaper from "./components/AddResearchPaper";
import ViewApprovedResearchPapers from "./components/ViewApprovedResearchPapers";
import ViewAllResearch from "./components/ViewAllResearch";
import ViewAllPayedResearchPapers from "./components/ViewAllPayedResearchPapers";
import UpdateResearchPaper from "./components/UpdateResearchPaper";
import ConferenceResearch from "./components/ConferenceResearch";

import './css/styles.css';
import './css/home.css';
import './css/form.css';

const App = () =>{
  return (
    
    <Router>
      <div className="app">
      
        <Switch>
          
          <Route exact path="/" component={NormalHome}/>
          <Route exact path="/adminhome" component= {AdminHome} />
          <Route exact path="/editorhome" component= {EditorHome} />
          <Route exact path="/researcherhome" component= {ResearcherHome} />
          <Route exact path="/reviewerhome" component= {ReviewerHome} />
          <Route exact path="/workshophome" component= {WorkShopHome} />

          <Route exact path="/admindetails" component= {AdminDetails} />
          <Route exact path="/adminlogin" component= {AdminLogin} />
          <Route exact path="/adminregister" component= {AdminRegister} />
          <Route exact path="/adminforgotpassword" component= {AdminForgotpassword} />
          <Route exact path="/adminresetpassword/:resetToken" component= {AdminResetpassword} />
          <Route exact path="/adminedit/:id" component= {AdminEdit} />
          <Route exact path="/editoredit/:id" component= {EditorEdit} />
          <Route exact path="/researcheredit/:id" component= {ResearcherEdit} />
          <Route exact path="/revieweredit/:id" component= {ReviewerEdit} />
          <Route exact path="/workshopedit/:id" component= {WorkshopEdit} />

          <Route exact path="/editordetails" component= {EditorDetails} />
          <Route exact path="/editorlogin" component= {EditorLogin} />
          <Route exact path="/editorregister" component= {EditorRegister} />
          <Route exact path="/editorforgotpassword" component= {EditorForgotpassword} />
          <Route exact path="/editorresetpassword/:resetToken" component= {EditorResetpassword} />

          <Route exact path="/researcherdetails" component= {ResearcherDetails} />
          <Route exact path="/researcherlogin" component= {ResearcherLogin} />
          <Route exact path="/researcherregister" component= {ResearcherRegister} />
          <Route exact path="/researcherforgotpassword" component= {ResearcherForgotpassword} />
          <Route exact path="/researcherresetpassword/:resetToken" component= {ResearcherResetpassword} />
          <Route exact path="/editresearcher/:id" component= {EditResearcher} />
          <Route exact path="/researcherdata/:id" component= {ResearcherData} />
          <Route exact path="/researcherdataedit/:id" component= {ResearcherDataEdit} />

          <Route exact path="/reviewerdetails" component= {ReviewerDetails} />
          <Route exact path="/reviewerlogin" component= {ReviewerLogin} />
          <Route exact path="/reviewerregister" component= {ReviewerRegister} />
          <Route exact path="/reviewerforgotpassword" component= {ReviewerForgotpassword} />
          <Route exact path="/reviewerresetpassword/:resetToken" component= {ReviewerResetpassword} />
          
          <Route path="/workshopdetails" exact component={WorkShopDetails} />
          
          <Route exact path="/workshoplogin" component= {WorkShopLogin} />
          <Route exact path="/workshopregister" component= {WorkShopRegister} />
          <Route exact path="/workshopforgotpassword" component= {WorkShopForgotpassword} />
          <Route exact path="/workshopresetpassword/:resetToken" component= {WorkShopResetpassword} />
          <Route exact path="/editsorkshop/:id" component= {EditWorkshop} />
          <Route exact path="/workshopdata/:workShopEmail" component= {WorkshopData} />
          <Route exact path="/workshopdataedit/:id" component= {WorkshopDataEdit} />

          <Route path="/loginpopup" component= {LoginPopup} />
          <Route path="/registerpopup" component= {RegisterPopup} />
        
        {/* Viraj */}
        
          <Route path="/create-rPaperAmount" component={insertResearchPaperAmount}/>
            <Route path="/create-attendeePayment" component={insertConferenceAttendee}/>
            <Route path="/get-oneRPayment/:id" component={updateResearchPaperAmount}/>
            <Route path="/delete-oneRPayment/:id" component={deleteResearchPaperAmount}/>
            <Route path="/delete-ConferenceAttendee/:contactNumber" component={deleteConferenceAttendee}/>
            <Route path="/get-allRPayment/" component={getResearchPaperAmount}/>
            <Route path="/get-ConferenceAttendeePayment/" component={getConferenceAttendees}/>

            <Route path="/get-allWorkshops/" component={getAllWorkshops}/>
            <Route path="/delete-workshopReviewer/:workshopTopic" component={deletedWorkshop}/>
            <Route path="/approve-workshopPage/:workshopTopic" component={approveWorkshop}/>
            <Route path="/reject-workshopPage/:workshopTopic" component={rejectWorkshop}/>

            <Route path="/get-allResearchPapers/" component={getAllResearchPapers}/>
            <Route path="/delete-rPaperReviewer/:researchTitle" component={deleteResearchPaper}/>
            <Route path="/approve-ResearchPaper/:researchTitle" component={approveResearchPaper}/>
            <Route path="/reject-ResearchPaper/:researchTitle" component={rejectResearchPaper}/>

            <Route path="/notification-ResearchPaper/:contactNumber" component={researchPaperNotification}/>
            <Route path="/notification-WorkShop/:contactNumber" component={workshopNotification}/>
        

         {/* Yathushan */}
         <Route path='/addConf' component={addConference}/>
              <Route path='/viewConf' component={viewConference}/>
              <Route path='/updateConf/:confName' component={updateConference}/>
              <Route path='/deleteConf/:confName' component={deleteConference}/>
              <Route path='/adminViewConf' component={adminViewConference}/>
              <Route path='/approveConf/:confName' component={approveConference}/>
              <Route path='/rejectConf/:confName' component={rejectConference}/>
              <Route path='/addWS' component={addWorkshop}/>
              <Route path='/viewAdminWS' component={viewAdminWorkshop}/>
              <Route path='/viewWS' component={viewWorkshop}/>
              <Route path='/updateWS/:topic' component={updateWorkshop}/>
              <Route path='/deleteWS/:topic/:path/:file' component={deleteWorkshop}/>
              <Route path='/viewConfWS/:confName' component={viewConfWorkshop}/>
              <Route path='/viewAttendConf/' component={viewAttendeeConference}/>
        
    {/* Dananjaya */}
              <Route path="/add-research" component={AddResearchPaper} exact/>
              <Route path="/user-researches" component={ViewAllResearch}/>
              <Route path="/approved-researches" component={ViewApprovedResearchPapers}/>
              <Route path="/get-all-payed" component={ViewAllPayedResearchPapers}/>
              <Route path="/update-research/:id" component ={UpdateResearchPaper}/>
              <Route path="/conf-research/:name" component={ConferenceResearch}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
