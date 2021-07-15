const app = require('../server');
const request = require('supertest');
    

describe('Post Endpoints', () => {
    it('should register a new editor', async () => {
      const res = await request(app)
        .post('/editor/editorregister')
        .send({
            editorName: 'Kusum Perera',
            editorEmail:'abc@gmail.com',
            editorPassword:'kusum1234'
        });
      expect(res.statusCode).toEqual(201);
    });
    
    it('should update a editor', async () => {
      const id= "60dc34cf24614a3e50602003";
      const res = await request(app)
        .put(`/editor/updateeditor/${id}`)
        .send({
            $set:{editorName: 'Kusum Perera',
            editorEmail:'abc@gmail.com',
            editorPassword:'kusum1234'}
        });
  
      expect(res.statusCode).toEqual(200);
    });
    it('should delete a editor', async () => {
        const id= "60dc34cf24614a3e50602003";
      const res = await request(app).delete(`/editor/deleteeditor/${id}`);
      expect(res.statusCode).toEqual(200);
    });
});
