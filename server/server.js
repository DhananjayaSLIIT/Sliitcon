require('dotenv').config({path: "./config.env"});
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/error');

connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(errorHandler);

const adminRoutes = require('./routes/adminRouter');
app.use(adminRoutes);

const editorRoutes = require('./routes/editorRouter');
app.use(editorRoutes);

const researcherRoutes = require('./routes/researcherRouter');
app.use(researcherRoutes);

const reviewerRoutes = require('./routes/reviewerRouter');
app.use(reviewerRoutes);

const workShopRoutes = require('./routes/workShopRouter');
app.use(workShopRoutes);


//Viraj

/*accessing adminPaymentRoute.js*/
const adminPaymentRoute = require("./routes/adminPaymentRoute.js");

/*accessing conferenceAttendeeRoute.js*/
const conferenceAttendeePay = require("./routes/conferenceAttendeeRoute.js");

// /*accessing workshopConductorRoute.js*/
// const workshopConductor = require("./routes/workshopConductorRoute");

// /*accessing workShopRoute.js*/
// const workShopRoute = require("./routes/workShopRoute.js");

/*accessing workshopNotificationRoute.js*/
const workShopNotificationRoute = require("./routes/workshopNotificationRoute");

// /*accessing researcherRoute.js*/
// const researcher = require("./routes/researcherRoute");

// /*accessing researchPaperRoute.js*/
// const researcherPaper = require("./routes/researchPaperRoute");

/*accessing researchNotificationRoute.js*/
const researcherNotification = require("./routes/researchNotificationRoute");

/*using express accesing the route*/
app.use("/adminPayment", adminPaymentRoute());

/*using express accesing the route*/
app.use("/conferenceAttendeePay", conferenceAttendeePay());

// /*using express accesing the route*/
// app.use("/workshopConductor", workshopConductor());

// /*using express accesing the route*/
// app.use("/workshop", workShopRoute());

/*using express accesing the route*/
app.use("/workshopNotification", workShopNotificationRoute());

// /*using express accesing the route*/
// app.use("/researcher", researcher());

// /*using express accesing the route*/
// app.use("/researcherPaper", researcherPaper());

/*using express accesing the route*/
app.use("/researcherNotification", researcherNotification());

//Yathushan
const conferenceAPI = require("./api/conference.api");
const workshopAPI = require("./api/workshop.api");

app.use("/conference",conferenceAPI());
app.use("/workshop",workshopAPI());

//Dananjaya
app.use('/api/v1', require('./routes/Research.route'));

const PORT = process.env.PORT;

const server = app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));

process.on("unhandledRejection", (err, promise) => {
    console.log(`Error occured: ${err}`);
    server.close(()=> process.exit(1));
});

module.exports = app;