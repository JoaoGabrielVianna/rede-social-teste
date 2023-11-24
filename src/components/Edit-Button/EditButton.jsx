import './EditButton.css'

export default function EditButton({text = 'Editar'}) {
    return (
        <>
            <main id="main-EditButton">
                <h1>{text}</h1>
            </main>
        </>
    )
}