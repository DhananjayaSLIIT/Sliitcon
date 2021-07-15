const app = require('../server');
const request = require('supertest');
    

describe('Post Endpoints', () => {
    it('should register a new Researcher', async () => {
      const res = await request(app)
        .post('/researcher/researcherregister')
        .send({
            researcherTopic: 'Python',
            researcherName: 'Bhanuka Rajarathne',
            researcherEmail:'abc@gmail.com',
            researcherPhone:'0751231231',
            researcherQualifications:'Bcs Hons IT',
            researcherPassword:'Python1234'
        });
      expect(res.statusCode).toEqual(201);
    });
    
    it('should update a Researcher', async () => {
      const id= "60dc34cf24614a3e50602003";
      const res = await request(app)
        .put(`/researcher/updateresearcher/${id}`)
        .send({
          $set:{researcherTopic: 'Python',
          researcherName: 'Bhanuka Rajarathne',
          researcherEmail:'abc@gmail.com',
          researcherPhone:'0751231231',
          researcherQualifications:'Bcs Hons IT',
          researcherPassword:'Python1234'}
        });
  
      expect(res.statusCode).toEqual(200);
    });
    it('should delete a Researcher', async () => {
        const id= "60dc34cf24614a3e50602003";
      const res = await request(app).delete(`/researcher/deleteresearcher/${id}`);
      expect(res.statusCode).toEqual(200);
    });
});
