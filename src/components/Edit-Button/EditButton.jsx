import './EditButton.css'

import edit_icon from '../../assets/svgs/edit-icon.svg'

export default function EditButton({text = 'Editar', onClick}) {
    return (
        <>
            <main id="main-EditButton" onClick={(onClick)}>
                <img src={edit_icon} alt="" />
            </main>
        </>
    )
}