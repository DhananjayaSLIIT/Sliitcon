const app = require('../server');
const request = require('supertest');
    

describe('Post Endpoints', () => {
    it('should register a new reviewer', async () => {
      const res = await request(app)
        .post('/reviewer/reviewerregister')
        .send({
            reviewerName: 'Bhanuka Rajarathne',
            reviewerEmail:'abc@gmail.com',
            reviewerPassword:'Python1234'
        });
      expect(res.statusCode).toEqual(201);
    });
    
    it('should update a reviewer', async () => {
      const id= "60dc34cf24614a3e50602003";
      const res = await request(app)
        .put(`/reviewer/updatereviewer/${id}`)
        .send({
          $set:{reviewerName: 'Bhanuka Rajarathne',
          reviewerEmail:'abc@gmail.com',
          reviewerPassword:'Python1234'}
        });
  
      expect(res.statusCode).toEqual(200);
    });
    it('should delete a reviewer', async () => {
        const id= "60dc34cf24614a3e50602003";
      const res = await request(app).delete(`/reviewer/deletereviewer/${id}`);
      expect(res.statusCode).toEqual(200);
    });
});
