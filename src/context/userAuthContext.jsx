import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, updateProfile, deleteUser, EmailAuthProvider, reauthenticateWithCredential
} from "firebase/auth";
import { auth, db, storage } from "../services/firebaseConfig";
import { collection, deleteDoc, doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { deleteObject, getDownloadURL, getMetadata, list, listAll, ref, uploadBytes } from "firebase/storage";
const userAuthContext = createContext();


0

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [dados, setDados] = useState({});
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
        biografia: '',
        name: displayName,
        email: email,
        faculVerification: false,
        photoURL: photoURL,
        senha: password,
        seguidores: 0,
        seguindo: 0,
        selos: 0,
        uid: userCredential.user.uid
      });

      // return logOut;
    } catch (error) {
      console.error('Erro ao criar usuário:', error.message);
    }
  }
  async function uploadPhoto(uid, photo) {
    try {
      const storageRef = ref(storage, `user_profiles/${uid}`);
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

  async function deleteUserAccount({ uid, password }) {
    console.log('ciclou')

    // Reautenticar o usuário
    const credential = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, credential);

    // Exclua o usuário no Firebase Authentication
    await deleteUser(user);

    // Exclua os dados do usuário no Firestore
    const userDocRef = doc(db, "users", user.uid);
    await deleteDoc(userDocRef);

    const desertRef = ref(storage, `user_profiles/${uid}`);

    // Delete the file
    deleteObject(desertRef).then(() => {
      console.log('excluiu')
      // File deleted successfully
    }).catch((error) => {
      console.log('nao excluiu')
      // Uh-oh, an error occurred!
    });

    // Desconecte o usuário (opcional, dependendo do seu fluxo)
    await signOut(auth);


  }



  useEffect(() => {
    
    const checkAuthState = async () => {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        setUser(currentUser);
        setLoading(false); // Quando a verificação estiver concluída, atualize o estado para parar o indicador de carregamento

        if (currentUser) {
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
      value={{ user, logIn, signUp, logOut, googleSignIn, deleteUserAccount, signed: !!user, }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}

