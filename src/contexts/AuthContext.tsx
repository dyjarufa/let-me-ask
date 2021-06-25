import { createContext, ReactNode, useEffect, useState } from 'react';
import { auth, firebase } from '../services/firebase';

type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>; //como mudei a função apara async, ela devolve uma Promise o seu retorno será void
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps){
const [user, setUser] = useState<User>();

useEffect(() => {
  //onAuthStateChanged state change. Ouve o evento
  //ele detecta se um usuário já tinha logado na aplicação anteriormente
  const unsubscribe = auth.onAuthStateChanged(user => { 
    if(user){
      const { displayName, photoURL, uid } = user;

      if(!displayName || !photoURL){
        throw new Error('Missing information from Google Account');
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  })

  return () => {
    unsubscribe(); //toda vez que uso um event listener dentro do useEffect preciso "desligar" esse evento
  }
}, [])


async function signInWithGoogle(){
  const provider = new firebase.auth.GoogleAuthProvider();

  const result = await auth.signInWithPopup(provider)
    if(result.user){
      const { displayName, photoURL, uid } = result.user;

      if(!displayName || !photoURL){
        throw new Error('Missing information from Google Account');
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
}
  return(
    <AuthContext.Provider value={{ user, signInWithGoogle}}>
      {props.children}
    </AuthContext.Provider>
  )
}