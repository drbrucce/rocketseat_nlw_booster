import React from 'react'
import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom'

interface HeaderProps {
    link?: string,
    linkText?: string
}

const Header: React.FC<HeaderProps> = (props)=>{
    return(
        <header>
            <img src={logo} alt="Ecoleta"/>

            {props.link ? (
            <Link to={props.link}>
                {props.linkText}
            </Link>) : ('')
            }
        </header>
    )
}

export default Header