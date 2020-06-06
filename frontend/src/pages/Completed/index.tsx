import React, { useEffect, } from 'react'
import { useHistory } from 'react-router-dom'
import { FiCheckCircle } from 'react-icons/fi'
import './styles.css'

const Completed = ()=>{

    const history = useHistory()

    useEffect(()=>{
        setTimeout(()=> history.push('/'), 3000)
    }, [])
    
    return(
        <div className="main">
            <span>
                <FiCheckCircle/>
            </span>
            <h1>Cadastro concluído!</h1>
            <small><strong>Redirecionando em 3 segundos...</strong></small>
        </div>
    )
}


export default Completed