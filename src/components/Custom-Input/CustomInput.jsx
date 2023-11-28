import './CustomInput.css'
import help_icon from '../../assets/svgs/icon-help.svg'
import { useState } from 'react'

export default function CustomInput({ icon, type = 'text', placehover = 'Digite algo...', onChange, title = 'text', error }) {
    const [focus, setFocus] = useState(false)
    const [text, setText] = useState('')
    
    return (
        <>
            <main id={focus ? "main-CustomInput-focus" : 'main-CustomInput'} style={{border: `${error ? '1px solid red' : ''}`, animation: `${error ? 'shake 300ms' : 'none'}`}} >
                <input type={type} onChange={(e) => {onChange(e), setText(e.target.value);}} onFocus={() => setFocus(true)} onBlur={() => setFocus(!text ? false: true)} />
                <div>
                    <img src={icon ? icon : help_icon} className='icon' />
                    <p>{focus ? title : placehover}</p>
                </div>

            </main>
        </>
    )
}

{/* <main id="main-CustomInput" >
    <div>
        <p>{title}</p>
    </div>
    <img src={icon ? icon : help_icon} className='icon' />
    <input type={type} placeholder={placehover} onChange={onChange} />
</main> */}