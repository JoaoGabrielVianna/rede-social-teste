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

export function CustomOverlayerButton({ show = true, title = 'Titulo Exemplo', text = 'Paragrafo exemplo', option_1 = 'Sair', option_2 = 'Voltar', onClick_opt1, onClick_opt2 }) {
    return (
      <>
        <div className='zone-touch-customOverlayerButton' style={{ display: show ? 'flex' : 'none' }} ></div>
        <main id="main-customOverlayerButton" style={{ display: show ? 'flex' : 'none' }}>
          <div>
            <h1>{title}</h1>
            <p>{text}</p>
            <div>
              <button onClick={onClick_opt1}><p>{option_1}</p></button>
              <button onClick={onClick_opt2}><p>{option_2}</p></button>
            </div>
          </div>
        </main>
      </>
    )
  }