import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'
//import logoImg from '../../assets/logo.svg'
import logoImg from '../../assets/eye.svg'

export default function NewWorker(){

  const [name,setName] = useState('')
  const [code,setCode] = useState('')
  const [occupation,setOccupation] = useState('')

  const companyId = localStorage.getItem('companyId')
  const history = useHistory()

  async function handleNewWorker(e){
    e.preventDefault()

    const data = {
      name,
      code,
      occupation
    }

    try {
      await api.post('workers',data, {
        headers:{
          Authorization: companyId
        }
      })

      history.push('/profile')
    } catch (err) {
      alert('Não foi possivel cadastrar, Tente Novamente')
    }

  }

  return(
    <div className="new-worker-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>
          <h1>Cadastrar Novo Funcionário</h1>
          <p>Descreva os principais dados do funcionário.</p>

          <Link className='back-link' to="/profile">
            <FiArrowLeft size={16} color='#2020d8' />
            Voltar para Home
          </Link>
        </section>

        <form onSubmit={handleNewWorker}>
          <input
            placeholder ="Nome do Funcionário"
            value = {name}
            onChange = {e => setName(e.target.value)}
          />

          <input
            placeholder ="Código"
            value = {code}
            onChange = {e => setCode(e.target.value)}
          />

          <input
            placeholder ="Ocupação"
            value = {occupation}
            onChange = {e => setOccupation(e.target.value)}
          />

          <button className="button" type= 'submit'>Cadastrar</button>
        </form>
      </div>
    </div>
  )
}