const connection = require('../database/connection')

module.exports = {
  async index(request, response){
    const company_id = request.headers.authorization
    const workers = await connection('workers').where('company_id', company_id).select('*')
    return response.json(workers)
  },

  async create(request, response){
    const {name, code, occupation} = request.body
    const company_id = request.headers.authorization
    
    const data = new Date()
    const modified = `${data.getHours()} : ${data.getMinutes()}`
    const status = 'Não verificado'

    //estudar mais sobre isso:(primeira chave do array é armazenado no id)(deve ser o indice/posição)
    const [id] = await connection('workers').insert({
      name,
      code,
      occupation,
      company_id,
      status,
      modified
    })
    return response.json({ id })
  },

  async delete(request, response){
    const { id } = request.params
    const company_id_auth = request.headers.authorization

    const worker = await connection('workers')
    .where('id', id)
    .select('company_id')
    .first()
    console.log( await connection('workers').select('*'))

    if(worker.company_id !== company_id_auth){
      return response.status(401).json({error:'Operation not permitted'})
    }
    await connection('workers').where('id', id).delete()
    return response.status(204).send()
  },

  async setStatus(request, response){
  
    const company_id_auth = request.headers.authorization
    const {id, status} = request.body
    const data = new Date()

    const {company_id} = await connection('workers')
    .where('id', id)
    .select('company_id')
    .first()

    if(company_id !== company_id_auth){
      return response.status(401).json({error:'Operation not permitted'})
    }

    const modified = `${data.getHours()} : ${data.getMinutes()}`
    
    await connection('workers')
    .where('id', id)
    .update({
      status,
      modified
    })

    return response.json({ modified })
  },

  async getStatus(request, response){
    const { id } = request.params
    const company_id_auth = request.headers.authorization

    const worker = await connection('workers')
    .where('id', id)
    .select('*')
    .first()

    if(worker.company_id !== company_id_auth){
      return response.status(401).json({error:'Operation not permitted'})
    }
    return response.json({ worker })
  }
}