import React, { useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import {FiLogIn} from 'react-icons/fi'

import api from '../../services/api'

import './styles.css'
import heroesImg from '../../assets/heroes.svg'
//import logoImg from '../../assets/logo.svg'
import logoImg from '../../assets/eye.svg'

export default function Logon(){

  const [id, setId] = useState('')
  const history = useHistory()

  async function handleLogin(e){
    e.preventDefault()

    try{
      const response = await api.post('sessions',{id})

      localStorage.setItem('companyId', id)
      localStorage.setItem('companyName', response.data.name)

      history.push('/profile')

    }catch(err){
      alert('Falha no Login,Tente Novamente')
    }

  }

  return(
    <div id="page-home">
      <div className="logon-container">
        <section className="form">
          <img src={logoImg} alt='Be the Hero' />

          <form onSubmit={handleLogin}>
            <h1>Faça seu Logon</h1>

            <input 
            placeholder='Sua ID' 
            value={id}
            onChange={event => setId(event.target.value)}
            />

            <button className="button" type='submit'>Entrar</button>
            <Link className='back-link' to="/register">
              <FiLogIn size={16} color='#2020d8' />
              Não tenho cadastro
            </Link>
          </form>

        </section>
        
        <img src={heroesImg} alt='Heroes'/>
      
      </div>
    </div>
  )
}

/*



*/ 