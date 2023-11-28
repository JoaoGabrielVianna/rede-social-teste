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
    const { signed, logOut } = useUserAuth();
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
                    logOut()
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

    if (usuario) {
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
                            <span ><EditButton onClick={() => alert('')} /></span>
                            {/* onClick={() => deleteUserAccount({ uid: user.uid, password: usuario.senha })} */}
                        </div>
                    </section>

                    {usuario.biografia &&
                        <section className='section-biografia'>
                            <p>
                                {usuario.biografia}
                            </p >
                        </section>}
                    <section className='section-user-metadata'>
                        <p>{usuario.seguidores} seguidores</p>
                        <p>{usuario.seguindo} seguindo</p>
                        <p>{usuario.selos} selos</p>
                    </section>
                </>
            </main>
        );
    }
}


export default function HomePage() {
    const { user, signed, logOut } = useUserAuth();
    const [usuario, setUsuario] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [SettingsPanel, setSettingsPanel] = useState(false)
    const navigate = useNavigate()

    // // Exemplo de como usar onAuthStateChanged e onSnapshot
    // onAuthStateChanged(auth, (user) => {
    //     if (user) {
    //         const userDocRef = doc(db, 'users', user.uid);
    //         onSnapshot(userDocRef, (doc) => {
    //             console.log('Dados do usuário em tempo real:', doc.data());
    //             setUsuario(doc.data())
    //         });
    //     }
    // });

    useEffect(() => {
        const userDocRef = doc(db, "users", user.uid);

        const unsub = onSnapshot(userDocRef, (doc) => {

            setUsuario(doc.data());
            navigate('/home')
            console.log("Current data: ", doc.data());
        });

        return () => unsub();
    }, [user.uid]);

    useEffect(() => {

        const obterUsuario = async () => {
            try {
                const userDocRef = doc(db, "users", user.uid);
                const userDocSnapshot = await getDoc(userDocRef);

                if (userDocSnapshot.exists()) {
                    const userData = userDocSnapshot.data();
                    setUsuario(userData);
                    console.log(usuario)
                } else {
                    console.log("Usuário não encontrado");
                    // logOut()
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
    


    if (usuario) {
        return (
            <>
                {usuario &&
                    <main id="main-home">
                        <ProfileHeader text='Perfil' onClick={() => setSettingsPanel(!SettingsPanel)} />
                        <UserProfile user={user} />
                        <PerfilSettingsPanel show={SettingsPanel} user_uid={user.uid} user_password={usuario.senha} />
                    </main>}

            </>
        )
    }
}
