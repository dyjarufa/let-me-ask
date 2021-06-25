import illustration from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import  googleIconImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss'
import { Button } from '../components/Button';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';
import { auth } from '../services/firebase';

export function Home(){
  const history = useHistory();

  function handleCreateRoom() {

    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider).then((result) =>{
      console.log(result);
      
      history.push('/rooms/new');
    })

  }

  return(
    <div id="page-auth">
      <aside>
        <img src={illustration} alt="illustration symbolizing questions and answers" />
        <strong>Create live Q&amp;A rooms</strong>
        <p>Answer your audience's doubts in real time</p>
      </aside>
      <main>
          <div className="main-content">
            <img src={logoImg} alt="letmeask logo" />
            <button onClick={handleCreateRoom} className="create-room">
                <img src={googleIconImg} alt="Google logo" />
                Create your room with Google
            </button>
            <div className="separator">or get in a room</div>
            <form>
              <input 
                type="text" 
                placeholder="Type the code room"
              />
              <Button type="submit">
                  Enter in the room
              </Button>
            </form>
          </div>
      </main>
    </div>
  )
}