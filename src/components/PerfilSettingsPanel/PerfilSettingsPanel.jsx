import { useUserAuth } from '../../context/userAuthContext'
import './PerfilSettingsPanel.css'

import help_icon from '../../assets/svgs/icon-help.svg'

export default function PerfilSettingsPanel({ show = true }) {
    const { logOut, deleteUserAccount } = useUserAuth()
    const options = [
        { id: 1, icon: help_icon, text: 'Configuracoes', onClick: () => alert('') },
        { id: 2, icon: help_icon, text: 'Deletar conta', onClick: deleteUserAccount },
        { id: 3, icon: help_icon, text: 'Sair', onClick: logOut },
    ]
    return (
        <>
            <main id="main-PerfilSettingsPanel" style={{ bottom: show === true ? '-1px' : '-502px' }}>
                <span>
                    {options.map((opt) => (
                        <div key={opt.id} onClick={opt.onClick}>
                            <img src={opt.icon} alt="" />
                            <h1>{opt.text}</h1>
                        </div>
                    ))}
                </span>

            </main>
        </>
    )
}