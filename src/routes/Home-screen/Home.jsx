import './Home.css'
import { useNavigate } from "react-router-dom";
import perfil_anonimo from '../../assets/svgs/perfil-anonimo.svg'
import { useUserAuth } from "../../context/userAuthContext";
import EditButton from '../../components/Edit-Button/EditButton';
import { ProfileHeader } from '../../components/Custom-Header/CustomHeader';
import { db } from '../../services/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import PerfilSettingsPanel from '../../components/PerfilSettingsPanel/PerfilSettingsPanel';

function UserProfile({ user }) {
    const { deleteUserAccount, signed } = useUserAuth();
    const [usuario, setUsuario] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {

        const obterUsuario = async () => {
            try {
                const userDocRef = doc(db, "users", user.uid);
                const userDocSnapshot = await getDoc(userDocRef);

                if (userDocSnapshot.exists()) {
                    const userData = userDocSnapshot.data();
                    setUsuario(userData);
                } else {
                    console.log("Usuário não encontrado");
                }
            } catch (error) {
                console.error("Erro ao obter usuário:", error.message);
            } finally {
                // Aguarda 1 segundo antes de tentar novamente
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setIsLoading(false);
            }
        };

        obterUsuario();
    }, [signed]);

    if (isLoading) {
        return (
            <main id='main-UserProfile-loading-skeleton'>
                <>
                    <section >
                        <img />
                        <div>
                            <span><h1></h1></span>
                            <span><span className='status' /><h1></h1></span>
                            <span></span>
                        </div>
                    </section>

                    <section>
                        <p className='biografia'>
                        </p>
                    </section>
                </>
            </main>);
    }

    if (!isLoading) {
        return (
            <main id='main-UserProfile'>
                <>
                    <section key={usuario.uid}>
                        <img src={usuario.photoURL ? usuario.photoURL : perfil_anonimo} onError={(e) => {
                            e.target.src = perfil_anonimo; // Define a imagem de perfil anônimo em caso de erro
                        }} />
                        <div>
                            <span><h1>{usuario.name}</h1></span>
                            <span><span className='status' style={{ backgroundColor: usuario.faculVerification === true ? 'green' : 'orange' }} /><h1>FIAP</h1></span>
                            <span ><EditButton /> <EditButton text='Deletar' onClick={() => deleteUserAccount({ uid: user.uid, password: usuario.senha })} /></span>
                        </div>
                    </section>

                    <section>
                        <p className='biografia'>
                            {usuario.biografia}
                        </p>
                    </section>
                </>
            </main>
        );
    }
}


export default function HomePage() {
    const { user } = useUserAuth();
    const [SettingsPanel, setSettingsPanel] = useState(false)
    return (
        <>

            <main id="main-home">
                <ProfileHeader text='Perfil' onClick={() => setSettingsPanel(!SettingsPanel)} />
                <UserProfile user={user} />
                <PerfilSettingsPanel show={SettingsPanel} />
            </main>
        </>
    )
}
