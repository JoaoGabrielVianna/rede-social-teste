import './Home.css'
import perfil_anonimo from '../../assets/svgs/perfil-anonimo.svg'
import { useUserAuth } from "../../context/userAuthContext";
import EditButton from '../../components/Edit-Button/EditButton';
import { ProfileHeader } from '../../components/Custom-Header/CustomHeader';
import { auth, db } from '../../services/firebaseConfig';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import PerfilSettingsPanel from '../../components/PerfilSettingsPanel/PerfilSettingsPanel';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function UserProfile({ user }) {
    const { signed, logOut, usuario } = useUserAuth();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        setIsLoading(false)
    }, [usuario])


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

    const formatarNumero = (numero) => {
        if (numero < 1000) {
            return numero;
        } else if (numero < 1000000) {
            const resultado = numero / 1000;
            return resultado % 1 === 0 ? `${resultado.toFixed(0)}k` : `${resultado.toFixed(1)}k`;
        } else {
            const resultado = numero / 1000000;
            return resultado % 1 === 0 ? `${resultado.toFixed(0)}M` : `${resultado.toFixed(1)}M`;
        }
    };




    return (

        <main id='main-UserProfile'>
            <>
                <section key={usuario.uid}>
                    <img src={usuario.photoURL ? usuario.photoURL : perfil_anonimo} onError={(e) => {
                        e.target.src = perfil_anonimo; // Define a imagem de perfil anônimo em caso de erro
                    }} />
                    <div>
                        <span><h1>{usuario.name}</h1></span>
                        {usuario.faculdade && <span><span className='status' style={{ backgroundColor: usuario.faculVerification === true ? 'green' : 'orange' }} /><h1>{usuario.faculdade}</h1></span>}
                        <span ><EditButton onClick={() => navigate('/editar-perfil')} /></span>
                    </div>
                </section>

                {usuario.biografia &&
                    <section className='section-biografia'>
                        <p>
                            {usuario.biografia}
                        </p >
                    </section>}
                <section className='section-user-metadata'>
                    <p><strong>{formatarNumero(usuario.seguidores)}</strong> seguidores</p>
                    <p><strong>{formatarNumero(usuario.seguindo)}</strong> seguindo</p>
                    <p><strong>{formatarNumero(usuario.selos)}</strong> selos</p>
                </section>
            </>
        </main>
    );

}


export default function HomePage() {
    const { user, signed } = useUserAuth();
    const [usuario, setUsuario] = useState(null);
    const [SettingsPanel, setSettingsPanel] = useState(false)


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
                    // logOut()
                }
            } catch (error) {
                console.error("Erro ao obter usuário:", error.message);
            } finally {
                // Aguarda 1 segundo antes de tentar novamente
                await new Promise((resolve) => setTimeout(resolve, 1000));
                // setIsLoading(false);
            }
        };


        // 
        obterUsuario();
    }, [signed]);



    if (usuario) {
        return (
            <>

                <main id="main-home">
                    <ProfileHeader text='Perfil' onClick={() => { setSettingsPanel(!SettingsPanel), console.log(SettingsPanel) }} />
                    <UserProfile user={user} />
                    <PerfilSettingsPanel show={SettingsPanel} Click={() => setSettingsPanel(!SettingsPanel)} user_uid={user.uid} user_password={usuario.senha} />
                    {/* SettingsPanel */}
                </main>

            </>
        )
    }
}
