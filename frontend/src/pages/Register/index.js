import React, { useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'
//import logoImg from '../../assets/logo.svg'
import logoImg from '../../assets/eye.svg'

export default function Register(){
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [whatsapp,setWhatsapp] = useState('')

  const history = useHistory()

  async function handleRegister(event){
    event.preventDefault()

    const data = {
      name,
      email,
      whatsapp
    }
    try {const response = await api.post('company', data)
    alert(`Seu ID de acesso: ${response.data.id}`) //data é o proprio json e id é a chave do objeto
    history.push('/')
    }catch(err) {
    alert('Erro no cadastro, tente novamente')
    }
  }

  return(
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>
          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e tenha uma ajuda para administrar funionários e EPIs!</p>

          <Link className='back-link' to="/">
            <FiArrowLeft size={16} color='#2020d8' />
            Voltar para Tela Inicial
          </Link>
        </section>

        <form onSubmit={handleRegister}>

          <input 
          placeholder="Nome da Empresa"
          value = {name}
          onChange = {event => setName(event.target.value)}
          />

          <input 
          type="email" 
          placeholder="E-mail"
          value = {email}
          onChange = {event => setEmail(event.target.value)}
          />

          <input 
          placeholder="Whatsapp"
          value = {whatsapp}
          onChange = {event => setWhatsapp(event.target.value)}
          />

          <button className="button" type= 'submit'>Cadastrar</button>

        </form>
      </div>
    </div>
  )
}