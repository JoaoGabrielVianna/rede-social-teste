import './Home.css'
import { useNavigate } from "react-router-dom";
import perfil_anonimo from '../../assets/svgs/perfil-anonimo.svg'
import { useUserAuth } from "../../context/userAuthContext";
import EditButton from '../../components/Edit-Button/EditButton';
import { ProfileHeader } from '../../components/Custom-Header/CustomHeader';


function UserProfile({ user }) {
    const navigate = useNavigate()
    const logoutButton = async () => {
        try {
            await logOut()
            navigate('')
        } catch (err) {
            console.log(err.message)
        }
    }
    return (
        <main id='main-UserProfile'>
            <section>
                <img src={user.photoURL} />
                <span>
                    <div><h1>{user.displayName}</h1></div>
                    <div><span className='status' /><h1>FIAP</h1></div>
                    <div><EditButton /></div>
                </span>
            </section>
            <section>
                <p>Lorem ipsum dolor sit amet. Ad minima voluptatum aut volupt explicabo exercitationem ia. Ut incidu peros as.</p>
            </section>
        </main>
    )
}


export default function HomePage() {
    const { user, logOut } = useUserAuth();
    return (
        <>

            <main id="main-home">
                <ProfileHeader text='Perfil'  onclick={logOut}/>
                <UserProfile user={user} />
            </main>
        </>
    )
}

{/* <>
    <header className="header">
        <section>
            <div className="icon" style={{ backgroundImage: `url(${user.photoURL ? user.photoURL : perfil_anonimo})` }} />
            <div className="div">
                <span><h1>{user.displayName}</h1></span>
                <span><div className="status"></div><h1>FIAP</h1></span>
                <span onClick={logoutButton}><div className="button"><h1>SAIR</h1></div></span>
            </div>
        </section>
        <section>
            <p>Lorem ipsum dolor sit amet. Ad minima voluptatum aut volupt explicabo exercitationem ia. Ut incidu peros as.</p>
        </section>
    </header>
</> */}