import { FormEvent, useState } from 'react';
import { useParams } from 'react-router'; 

import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

import '../styles/room.scss'

type RoomParams = {
  id: string;
}

export function Room(){
  //Consigo recuperar os parâmtros da rota da minha página(App.tsx) com o useParams.
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { user } = useAuth();

  const [newQuestion, setNewQuestion] = useState('')

  async function handleSendQuestion(event: FormEvent){
    event.preventDefault();

    if(newQuestion.trim() === '') {
      return;
    }

    if(!user){
      //TODO - hot toast
      throw new Error('You must be logged in')
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false
    }

    await database.ref(`rooms/${roomId}/questions`).push(question); //será criando o path questions dentro do firebase
    setNewQuestion('')

  }
  
  return(
    <div id="page-room"> 
      <header>
        <div className="content">
          <img src={logoImg} alt="letmeask" />
          <RoomCode code={roomId}/>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>React Room</h1>
          <span>4 questions</span>
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea 
            placeholder="what would you like to ask?"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          />

          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>To ask a question, <button>please login</button>.</span>
            ) }
            <Button type="submit" disabled={!user}>
                Send question
            </Button>  
          </div>
        </form>
        {JSON.stringify(questions)}
      </main>
    </div>
  )
}