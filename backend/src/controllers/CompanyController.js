const nodemailer = require('nodemailer')

const generateId = require('../utils/generateId')
const connection = require('../database/connection')

module.exports = {
  async index(request, response){
    const company = await connection('company').select('*')
    return response.json(company)
  },

  async create(request, response){
  
    const {name, email, whatsapp} = request.body

    const id = generateId()

    await connection('company').insert({
      id,
      name,
      email,
      whatsapp
    })

    return response.json({id})
  },

  async mailId(request, response){
    console.log("Enviando email de recuperação...")
    const { email } = request.body

    try{
      const companyProps = await connection('company')
      .where('email', email)
      .select('id', 'name')
      .first()

      const {id, name} = companyProps

      console.log(companyProps)
      
      const transporter = nodemailer.createTransport({
        // service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        // ignoreTLS: false,
        secure: true,
        auth: {
          user: 'companyvisionproject@gmail.com',
          pass: 'plrt3134'
        }
      })

      const mailOptions = {
        from: 'companyvisionproject@gmail.com',
        to: email,
        subject: 'Recuperação da sua ID Vision',
        // html: '<h1>Olá</h1><br/><h3>Você tentou acessar a plataforma, mas esqueceu a Id:</h3><br/><h2>${id}</h2><br/><p>Quarde em um lugar seguro!</p>'
        html: `<!doctype html>
        <html ⚡4email>
          <head>
            <meta charset="utf-8">
          </head>
          <body>
            <h1>Olá, ${name}</h1><br/>
            <h2>Você tentou acessar a plataforma, mas esqueceu a Id:</h2><br/>
            <h2>${id}</h2><br/>
            <h2>Guarde em um lugar seguro!</h2>
          </body>
      </html>`
      }
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error)
          return response.status(401).json({error:'An error has occurred'})
        } else {
          console.log('Email sent: ' + info.response)
          return response.status(204).send()
        }
      })
    }catch{
      console.log("Erro no Envio do Email")
      return response.status(401).json({error:'An error has occurred'})
    }
  }
}
