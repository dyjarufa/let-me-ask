import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';

import { Route, BrowserRouter } from 'react-router-dom';
import { createContext, useState } from 'react';
import { auth, firebase } from './services/firebase';
import { useEffect } from 'react';

type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>; //como mudei a função apara async, ela devolve uma Promise o seu retorno será void
}

export const AuthContext = createContext({} as AuthContextType);

function App() {
const [user, setUser] = useState<User>();

useEffect(() => {
  //onAuthStateChanged state change. Ouve o evento
  //ele detecta se um usuário já tinha logado na aplicação anteriormente
  auth.onAuthStateChanged(user => { 
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

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      <BrowserRouter>
        <Route path="/" exact component={Home}/>
        <Route path="/rooms/new" component={NewRoom}/>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
