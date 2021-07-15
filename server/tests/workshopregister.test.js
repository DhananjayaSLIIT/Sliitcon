const app = require('../server');
const request = require('supertest');
    

describe('Post Endpoints', () => {
    it('should register a new work shop conductor', async () => {
      const res = await request(app)
        .post('/workshop/workshopregister')
        .send({
            workShopTitle: 'Java',
            workShopName: 'Samantha Bandara',
            workShopEmail:'abc@gmail.com',
            workShopPhone:'0751231231',
            workShopDescription:'Java Work shop with all basics',
            workShopPassword:'java1234'
        });
      expect(res.statusCode).toEqual(201);
    });
    
    it('should update a workshop conductor', async () => {
      const id= "60dc34cf24614a3e50602003";
      const res = await request(app)
        .put(`/workshop/updateworkshop/${id}`)
        .send({
            $set: {
              workShopTitle: 'Java',
              workShopName: 'Samantha Bandara',
              workShopEmail:'abc@gmail.com',
              workShopPhone:'0751231231',
              workShopDescription:'Java Work shop with all basics',
              workShopPassword:'java1234'
            }
           
        });
  
      expect(res.statusCode).toEqual(200);
    });
    it('should delete a workshop constructor', async () => {
        const id= "60dc34cf24614a3e50602003";
      const res = await request(app).delete(`/workshop/deleteworkshop/${id}`);
      expect(res.statusCode).toEqual(200);
    });
});
