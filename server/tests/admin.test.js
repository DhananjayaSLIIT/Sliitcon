const app = require('../server');
const request = require('supertest');
    

describe('Post Endpoints', () => {
    it('should register a new admin', async () => {
      const res = await request(app)
        .post('/admin/adminregister')
        .send({
            adminName: 'Kusal perera',
            adminEmail:'abc@gmail.com',
            adminPassword:'kusal1234'
        });
      expect(res.statusCode).toEqual(201);
    });
    
    it('should update a admin', async () => {
      const id= "60dc34cf24614a3e50602003";
      const res = await request(app)
        .put(`/admin/updateadmin/${id}`)
        .send({
          $set:{ adminName: 'Kusal perera',
          adminEmail:'abc@gmail.com',
          adminPassword:'kusal1234'}
        });
  
      expect(res.statusCode).toEqual(200);
    });
    it('should delete a admin', async () => {
        const id= "60dc34cf24614a3e50602003";
      const res = await request(app).delete(`/admin/deleteadmin/${id}`);
      expect(res.statusCode).toEqual(200);
    });
});
