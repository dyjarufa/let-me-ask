import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg';
import illustration from '../assets/images/illustration.svg';

import '../styles/auth.scss'
import { Button } from '../components/Button'; 
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';


export function NewRoom() {
  const { user } = useAuth();

  const [newRom, setNewRoom] = useState('');

  const history = useHistory()

  async function handleCreateRoom(event:FormEvent) {
    event.preventDefault();

    if(newRom.trim() === '') {
      return;
    }

    //reference é um registro de dados dentro do banco de dados para
    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRom,
      authorId: user?.id,
    })

    history.push(`/rooms/${firebaseRoom.key}`)
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
            <img src={logoImg} alt="letmeask" />
            <h2>Create a new room</h2>
            <form onSubmit={handleCreateRoom}>
              <input 
                type="text" 
                placeholder="room name"
                onChange={event => setNewRoom(event.target.value)}
                value={newRom}
              />
              <Button type="submit">
                  Create room
              </Button>
            </form>
            <p>would you like to join an already created room? <Link to="/">click here</Link> </p>
          </div>
      </main>
    </div>
  )
 }