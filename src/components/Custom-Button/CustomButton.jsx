import './CustomButton.css'
import { Link } from 'react-router-dom'
import button_ativo from '../../assets/svgs/button-ativo.svg'
import button_desativado from '../../assets/svgs/button-desativado.svg'
import button_email from '../../assets/svgs/button-email.svg'

export function CustomButton({ ativo, desativado, text = 'Teste', link, onClick }) {
    return (
        <main onClick={onClick}>
            <Link to={link} className='main-custom' style={{ backgroundImage: `url(${ativo === true ? button_ativo : button_desativado})`, opacity: desativado ? 0.5 : '' }}>
                <h1 style={{ fontSize: 16, color: ativo ? '' : '#363636' }}>{text}</h1>
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