const connection = require('../database/connection')

module.exports = {
  async index(request, response){
    const company_id = request.headers.authorization
    const workers = await connection('workers').where('company_id', company_id)
    return response.json(workers)
  },

  async create(request, response){
    const {name, code, occupation} = request.body
    const company_id = request.headers.authorization
    //estudar mais sobre isso:(primeira chave do array é armazenado no id)(deve ser o indice/posição)
    const [id] = await connection('workers').insert({
      name,
      code,
      occupation,
      company_id
    })
    return response.json({ id })
  },

  async delete(request, response){
    const { id } = request.params
    const company_id = request.headers.authorization

    const worker = await connection('workers')
    .where('id', id)
    .select('company_id')
    .first()
    console.log( await connection('workers').select('*'))

    if(worker.company_id !== company_id){
      return response.status(401).json({error:'Operation not permitted'})
    }
    await connection('workers').where('id', id).delete()
    return response.status(204).send()
  },

  async getInfo(request, response){
    const { id } = request.params
    const company_id = request.headers.authorization

    const worker = await connection('workers')
    .where('id', id)
    .select('*')
    .first()
    console.log( await connection('workers').select('*'))

    if(worker.company_id !== company_id){
      return response.status(401).json({error:'Operation not permitted'})
    }
    return response.json({ worker })
  }
}