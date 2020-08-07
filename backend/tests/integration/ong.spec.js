const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')


describe('Company',() => {
  beforeEach(async() => {
    await connection.migrate.rollback()
    await connection.migrate.latest()
  })

  afterAll(async () => {
    await connection.destroy()
  })

  it('should be able to create a new Company', async () => {
    const response = await request(app)
    .post('/company')
    //.set('Autorization', 'id válido') para headers
    .send({
      name: "company_test",
      email: "contatotest@gmailcom",
      whatsapp: '1100000000'
    })
    expect(response.body).toHaveProperty('id')
    expect(response.body.id).toHaveLength(8)
  })
})
