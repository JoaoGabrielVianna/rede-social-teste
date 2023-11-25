import { useUserAuth } from '../../context/userAuthContext'
import './PerfilSettingsPanel.css'

export default function PerfilSettingsPanel({ show = true }) {
    const { logOut, deleteUserAccount } = useUserAuth()
    const options = [
        { id: 1, icon: '', text: 'Configuracoes', onClick: () => alert('') },
        { id: 2, icon: '', text: 'Deletar conta', onClick: deleteUserAccount },
        { id: 3, icon: '', text: 'Sair', onClick: logOut },
    ]
    return (
        <>
            <main id="main-PerfilSettingsPanel" style={{ bottom: show === true ? '-1px' : '-502px' }}>
                <span>
                    {options.map((opt) => (
                        <div key={opt.id} onClick={opt.onClick}>
                            <img src="" alt="" />
                            <h1>{opt.text}</h1>
                        </div>
                    ))}
                </span>

            </main>
        </>
    )
}