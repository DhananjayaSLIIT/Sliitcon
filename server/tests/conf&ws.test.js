const app = require('../server');
const request = require('supertest');
    

describe('Post Endpoints', () => {
    it('should create a new conference', async () => {
      const res = await request(app)
        .post('/conference/add')
        .send({
          confName: 'AI_Conference',
          confVenu: 'Kandy',
          confDate: '6/30/2021',
          confRegfee:'15000'
        });
      expect(res.statusCode).toEqual(200);
    });
    it('should fetch a single conference', async () => {
      const confName= "AI_Conference";
      const res = await request(app).get(`/conference/get/${confName}`);
      expect(res.statusCode).toEqual(200);
    });
    it('should update a conference', async () => {
      const confName= "AI_Conference";
      const res = await request(app)
        .put(`/conference/update/${confName}`)
        .send({
          conferenceName: 'AI_Conference',
          venu: 'Colombo',
          date: '7/30/2021',
          registerFee:'15000'
        });
  
      expect(res.statusCode).toEqual(200);
    });
    it('should fetch all conferences', async () => {
      const res = await request(app).get(`/conference/view/`);
      expect(res.statusCode).toEqual(200);
    });
    it('should approve a conference', async () => {
      const confName= "AI_Conference";
      const res = await request(app).put(`/conference/updateAcStatus/${confName}`);
      expect(res.statusCode).toEqual(200);
    });
    it('should fetch approved conference', async () => {
      const res = await request(app).get(`/conference/viewAc/`);
      expect(res.statusCode).toEqual(200);
    });
    it('should reject a conference', async () => {
      const confName= "AI_Conference";
      const res = await request(app).put(`/conference/updateFaStatus/${confName}`);
      expect(res.statusCode).toEqual(200);
    });
    it('should delete a conference', async () => {
      const confName= "AI_Conference";
      const res = await request(app).delete(`/conference/delete/${confName}`);
      expect(res.statusCode).toEqual(200);
    });
});
