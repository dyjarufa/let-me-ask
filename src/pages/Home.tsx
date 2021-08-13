import illustration from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import  googleIconImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss'
import { Button } from '../components/Button';

import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useState, FormEvent } from 'react';
import { database } from '../services/firebase';

export function Home(){
  const history = useHistory();

  const { user, signInWithGoogle } = useAuth()

  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if(!user){
      await signInWithGoogle();
    }
      
    history.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent){
    event.preventDefault();

    if(roomCode.trim() === ''){
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get() //get  busca todos os registros da sala com o roomCode informado

    if(!roomRef.exists()) {
      return alert('Room does not exists');
    }

    if(roomRef.val().endAt){
      alert('Room already closed')
    }


    history.push(`/rooms/${roomCode}`)

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
            <div className="separator">or join a room</div>
            <form onSubmit={handleJoinRoom}>
              <input 
                type="text" 
                placeholder="Type the code room"
                onChange={event => setRoomCode(event.target.value)}
                value={roomCode}
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