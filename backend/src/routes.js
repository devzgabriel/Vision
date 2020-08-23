const express = require('express')
const { celebrate, Segments, Joi } = require('celebrate')

const CompanyController = require('./controllers/CompanyController')
const SessionController = require('./controllers/SessionController')
const WorkersController = require('./controllers/WorkersController')

const routes = express.Router()

routes.post('/sessions', SessionController.create)

routes.get('/company', CompanyController.index)

routes.post('/company/forgot-id', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email()
  })
}), CompanyController.mailId)

routes.post('/company', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    whatsapp: Joi.string().required().min(10).max(11)
  })
}), CompanyController.create)

routes.get('/workers', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}), WorkersController.index)

routes.post('/workers', WorkersController.create)

routes.delete('/workers/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}), WorkersController.delete)

routes.get('/worker/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}), WorkersController.getInfo)

module.exports = routes
