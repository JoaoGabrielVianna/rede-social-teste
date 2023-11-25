import './EditButton.css'

export default function EditButton({text = 'Editar', onClick}) {
    return (
        <>
            <main id="main-EditButton" onClick={(onClick)}>
                <h1>{text}</h1>
            </main>
        </>
    )
}