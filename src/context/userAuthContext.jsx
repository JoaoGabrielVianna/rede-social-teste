import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, db, storage } from "../services/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
const userAuthContext = createContext();




export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  async function signUp(email, password, displayName, photo) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Upload da photo para o Firebase Storage
      const photoURL = await uploadPhoto(userCredential.user.uid, photo);

      // Atualiza o perfil do usuário com o displayName e a photoURL
      await updateProfile(userCredential.user, {
        displayName: displayName,
        photoURL: photoURL,
      });

      // Atualiza as informações do usuário no Firestore, incluindo a URL da photo
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name: displayName,
        email: email,
        faculVerification: false,
        photoURL: photoURL,
      });

      return { user: userCredential.user, autoLogin: false };
    } catch (error) {
      console.error('Erro ao criar usuário:', error.message);
    }
  }
  async function uploadPhoto(uid, photo) {
    try {
      const storageRef = ref(storage, `user_profiles/${uid}/photoURL`);
      await uploadBytes(storageRef, photo);
  
      // Obter a URL da foto após o upload
      const photoURL = await getDownloadURL(storageRef);
      return photoURL;
    } catch (error) {
      console.error('Erro ao fazer upload da foto:', error.message);
    }
  }
  function logOut() {
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  useEffect(() => {
    const checkAuthState = () => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false); // Quando a verificação estiver concluída, atualize o estado para parar o indicador de carregamento

        if (currentUser) {
          // Se o usuário estiver autenticado, redirecione para a rota /home
          navigate('/home');
        }
      });

      return () => {
        unsubscribe(); // Certifique-se de cancelar a inscrição ao desmontar o componente
      };
    };

    checkAuthState();
  }, []); // Certifique-se de fornecer um array vazio como segundo argumento para useEffect para garantir que seja executado apenas uma vez no montagem inicial


  if (loading) {
    return (<><p>Verificando estado de autenticação...</p></>)
  }


  return (

    <userAuthContext.Provider
      value={{ user, logIn, signUp, logOut, googleSignIn, signed: !!user }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}

