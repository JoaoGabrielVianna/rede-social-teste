import './CustomInput.css'
export default function CustomInput({ icon, type = 'text', placehover= 'Digite algo...', onChange }) {
    return (
        <>
            <main id="main-CustomInput" >
                <div className='icon'></div>
                <input type={type} placeholder={placehover} onChange={onChange} />
                {/* <div className='icon2'></div> */}
            </main>
        </>
    )
}