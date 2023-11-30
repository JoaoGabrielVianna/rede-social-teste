import { ProfileHeader } from '../../components/Custom-Header/CustomHeader'
import './PerfilEditor.css'
import CustomInput from '../../components/Custom-Input/CustomInput'
import { useUserAuth } from '../../context/userAuthContext'


export default function PerfilEditor() {
    const { usuario } = useUserAuth()
    return (
        <>
            <main id="main-PerfilEditor">
                <ProfileHeader text='Editar Perfil' goBack={'/home'} />
                <span>
                    <div><CustomInput value={usuario.name} title='usuário' disable /></div>
                    <div><CustomInput value={'nome de usuario...'} title='Nome de usuário' disable/></div>
                    <div><CustomInput value={usuario.email} title='E-mail' disable/></div>
                    <div><CustomInput value={usuario.senha} title='Senha' disable/></div>
                    <span></span>
                    <div><CustomInput value={usuario.biografia} title='Biografia' disable/></div>
                </span>
            </main>
        </>
    )
}