import './CustomAlert.css'

export default function CustomAlert({text= 'Erro: Exemplo'}){
    return(
        <>
            <main id="main-CustomAlert">
                <h1>{text}</h1>
            </main>
        </>
    )
}