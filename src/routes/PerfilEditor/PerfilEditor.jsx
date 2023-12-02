import { ProfileHeader } from '../../components/Custom-Header/CustomHeader'
import './PerfilEditor.css'
import CustomInput, { CustomOverlayerInput } from '../../components/Custom-Input/CustomInput'
import { useUserAuth } from '../../context/userAuthContext'
import { useState } from 'react'


export default function PerfilEditor() {
    const [overlayerUser, setOverlayerUser] = useState(false)
    const [overlayerName, setOverlayerName] = useState(false)
    const [overlayerEmail, setOverlayerEmail] = useState(false)
    const [overlayerSenha, setOverlayerSenha] = useState(false)
    const [overlayertBio, setOverlayerBio] = useState(false)
    const { usuario } = useUserAuth()

    const Informações_Pessoais = [
        { icon: 'user', visible: overlayerUser, value: usuario.name, title: 'Usuário', disable: true, icon_2: true, cursor: true, onClick: () => setOverlayerUser(!overlayerUser), goBack: () => setOverlayerUser(!overlayerUser) },
        { icon: 'user', visible: overlayerName, value: 'nome de usuário...', title: 'Nome de Usuário', disable: true, icon_2: true, cursor: true, onClick: () => setOverlayerName(!overlayerName), goBack: () => setOverlayerName(!overlayerName) },
        { icon: 'email', visible: overlayerEmail, value: usuario.email, title: 'E-mail', disable: true, icon_2: true, cursor: true, onClick: () => setOverlayerEmail(!overlayerEmail), goBack: () => setOverlayerEmail(!overlayerEmail) },
        { icon: 'password', visible: overlayerSenha, value: usuario.senha, title: 'Senha', disable: true, icon_2: true, cursor: true, onClick: () => setOverlayerSenha(!overlayerSenha), goBack: () => setOverlayerSenha(!overlayerSenha) },
    ];

    const Sobre_Usuário = [
        { icon: 'user', visible: overlayertBio, value: usuario.biografia, title: 'Biografia', disable: true, icon_2: true, cursor: true, onClick: () => setOverlayerBio(!overlayertBio), goBack: () => setOverlayerBio(!overlayertBio) },
    ];
    return (
        <>
            <main id="main-PerfilEditor">
                <ProfileHeader text='Editar Perfil' goBack={'/home'} />
                <span>
                    {Informações_Pessoais.map((data, index) => (
                        <div key={index}>
                            <CustomInput
                                icon={data.icon}
                                value={data.value}
                                title={data.title}
                                disable={data.disable}
                                icon_2={data.icon_2}
                                cursor={data.cursor}
                                onClick_icon_2={data.onClick}

                            />
                            <CustomOverlayerInput show={data.visible} title={data.title} goBack={data.goBack} />
                        </div>
                    ))}
                    <span></span>
                    {Sobre_Usuário.map((data, index) => (
                        <div key={index}>
                            <CustomInput
                                icon={data.icon}
                                value={data.value}
                                title={data.title}
                                disable={data.disable}
                                icon_2={data.icon_2}
                                cursor={data.cursor}
                                onClick_icon_2={data.onClick}
                            />
                            <CustomOverlayerInput show={data.visible} title={data.title} goBack={data.goBack} />
                        </div>
                    ))}
                </span>

            </main>
        </>
    )
}