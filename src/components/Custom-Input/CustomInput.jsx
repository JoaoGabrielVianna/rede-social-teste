import './CustomInput.css'
import help_icon from '../../assets/svgs/icon-help.svg'

export default function CustomInput({ icon, type = 'text', placehover = 'Digite algo...', onChange, title = 'text' }) {
    return (
        <>
            <main id="main-CustomInput" >
                <div>
                    <p>{title}</p>
                </div>
                <img src={icon ? icon : help_icon} className='icon' />
                <input type={type} placeholder={placehover} onChange={onChange} />
            </main>
        </>
    )
}