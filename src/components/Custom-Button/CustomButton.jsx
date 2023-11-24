import './CustomButton.css'
import { Link } from 'react-router-dom'

export function CustomButtonPink({ desativado, text = 'Teste', link, onClick }) {
    return (
        <main onClick={onClick}>
            <Link to={link} className='main-custom-pink' style={{ opacity: desativado ? 0.5 : '' }}>
                <h1 style={{ fontSize: 16 }}>{text}</h1>
            </Link>
        </main>
    )

}

export function CustomButtonWhite({ desativado, text = 'Teste', link, onClick }) {
    return (
        <main onClick={onClick}>
            <Link to={link} className='main-custom-white' style={{ opacity: desativado ? 0.5 : '' }}>
                <h1 style={{ fontSize: 16, color: '#363636' }}>{text}</h1>
            </Link>
        </main>
    )

}

export function CustomButtonEmail({ link, onClick }) {
    return (
        <main onClick={onClick}>
            <Link to={link} className='main-custom-email'>
            </Link>
        </main>
    )

}