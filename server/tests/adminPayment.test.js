const app = require('../server');
const request = require('supertest');

describe('Post Endpoints', () => {
    it('should create a new attendee payment', async () => {
      const res = await request(app)
        .post('/conferenceAttendeePay/create')
        .send({
            conferenceName: 'Datascience',
            registerFee: '4500',
            email: 'amal@gmail.com',
            contactNumber: '0776572518',
            cardNumber: '112233665521',
            cvvNumber: '123',
            exDate: '12/21',
        });
      expect(res.statusCode).toEqual(200);
    });
    it('should fetch a single attendee payment', async () => {
      const contactNumber = "0776572518";
      const res = await request(app).get(`/conferenceAttendeePay/get/${contactNumber}`);
      expect(res.statusCode).toEqual(200);
    });
    it('should fetch all attendee payment', async () => {
      const res = await request(app)
        .get(`/conferenceAttendeePay/`);
        expect(res.statusCode).toEqual(200);
    });
    it('should delete a attendee payment', async () => {
      const contactNumber= "0776572518";
      const res = await request(app).delete(`/conferenceAttendeePay/delete/${contactNumber}`);
      expect(res.statusCode).toEqual(200);
    });
    it('should create a research paper registration fee', async () => {
        const res = await request(app)
          .post('/adminPayment/create')
          .send({
            researchPaperAmount: '2500',
            type = "researchPaper"
          });
        expect(res.statusCode).toEqual(200);
    });
    it('should create a work shop notification accept', async () => {
        const res = await request(app)
          .post('/workshopNotification/createAccept')
          .send({
            contactNumber: '0776572518',
            workShopMessage: 'SEPQM Workshop Is Approved By Reviewer!!!',
            date: '12/12'
          });
        expect(res.statusCode).toEqual(200);
    });
    it('should create a work shop notification reject', async () => {
        const res = await request(app)
          .post('/workshopNotification/createReject')
          .send({
            contactNumber: '0776572518',
            workShopMessage: 'SEPQM Workshop Is Rejected By Reviewer!!!',
            date: '12/12'
          });
        expect(res.statusCode).toEqual(200);
    });
    it('should fetch all notifications related to a workshop conductor', async () => {
        const contactNumber = "0776572518";
        const res = await request(app).get(`/workshopNotification/get/${contactNumber}`);
        expect(res.statusCode).toEqual(200);
      });
    it('should fetch one research paper', async () => {
        const researchTitle = "SEPQM";
        const res = await request(app).get(`/researcherPaper/get-OneResearchPaper/${researchTitle}`);
        expect(res.statusCode).toEqual(200);
      });
    it('should delete a workshop', async () => {
        const workshopTopic= "SEPQM";
        const res = await request(app).delete(`/workshop/delete/${workshopTopic}`);
        expect(res.statusCode).toEqual(200);
      });
    it('should fetch all notifications related to a researcher', async () => {
        const contactNumber = "0776572518";
        const res = await request(app).get(`/researcherNotification/get/${contactNumber}`);
        expect(res.statusCode).toEqual(200);
      });
    
});