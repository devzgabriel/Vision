const generateId = require('../utils/generateId')
const connection = require('../database/connection')

module.exports = {
  async index(require, response){
    const company = await connection('company').select('*')
    return response.json(company)
  },

  async create(require, response){
    //async pq pode demorar p registrar no banco
  const {name, email, whatsapp} = require.body

  const id = generateId()

  await connection('company').insert({
    id,
    name,
    email,
    whatsapp
  })

  return response.json({id})
  }
}
