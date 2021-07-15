const app = require('../server');
const request = require('supertest');

describe('Post Endpoints', () => {
    it('should create a new Research', async () => {
        const res = await request(app)
            .post('/api/v1/add-research')
            .send({
                researchTitle:"Science",
                conference:"Information technology",
                researchEmail:"abc@gmail.com",
                researchPhone:"0711234567",
                reviewerStatus:"Pending",
                filename:"abc.jpg",
                path:"newFile/newFile",
                userID:"12346789312",
                researchPayment:'',
            });
        expect(res.statusCode).toEqual(201);
    });
    it('should get a all conference', async () => {
        //const confName= "AI_Conference";
        const res = await request(app).get(`/api/v1/get-conferences`);
        expect(res.statusCode).toEqual(200);
    });
    it('get all research by user id', async () => {
        const userID= "60da22bb4522a7fe6c0faead";
        const res = await request(app)
            .get(`/api/v1/get-all-researchById/${userID}`);

        expect(res.statusCode).toEqual(200);
    });
    it('should get the payment for research papers', async () => {
        const res = await request(app).get(`/api/v1/get-payment`);
        expect(res.statusCode).toEqual(200);
    });
    it('Get research papers for particular conference', async () =>{
        const name = "Whatever"
        const res = await request(app).get(`/research-by-name/${name}`);
        expect(res.statusCode).toEqual(200);
    });
});