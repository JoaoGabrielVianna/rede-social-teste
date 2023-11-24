import './CustomButton.css'
import { Link } from 'react-router-dom'
import button_pink from '../../assets/svgs/button-ativo.svg'
import button_white from '../../assets/svgs/button-desativado.svg'
import button_email from '../../assets/svgs/button-email.svg'

export function CustomButtonPink({ desativado, text = 'Teste', link, onClick }) {
    return (
        <main onClick={onClick}>
            <Link to={link} className='main-custom' style={{ backgroundImage: `url(${button_pink})`, opacity: desativado ? 0.5 : '' }}>
                <h1 style={{ fontSize: 16 }}>{text}</h1>
            </Link>
        </main>
    )

}

export function CustomButtonWhite({ desativado, text = 'Teste', link, onClick }) {
    return (
        <main onClick={onClick}>
            <Link to={link} className='main-custom' style={{ backgroundImage: `url(${button_white})`, opacity: desativado ? 0.5 : '' }}>
                <h1 style={{ fontSize: 16, color: '#363636' }}>{text}</h1>
            </Link>
        </main>
    )

}

export function CustomButtonEmail({ link, onClick }) {
    return (
        <main onClick={onClick}>
            <Link to={link} className='main-custom' style={{ backgroundImage: `url(${button_email})` }}>
            </Link>
        </main>
    )

}