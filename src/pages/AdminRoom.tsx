import { useParams } from 'react-router'; 

import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
// import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';

import '../styles/room.scss'

type RoomParams = {
  id: string;
}

export function AdminRoom(){
  //Consigo recuperar os parâmtros da rota da minha página(App.tsx) com o useParams.
  // const { user } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const {questions, title} = useRoom(roomId);
  
  return(
    <div id="page-room"> 
      <header>
        <div className="content">
          <img src={logoImg} alt="letmeask" />
          <div>
            <RoomCode code={roomId}/>
            <Button isOutlined>
              Close Room
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Room {title}</h1>
          {questions.length > 0 && <span>{questions.length} question(s)</span>}
        </div>
        <div className="question-list">
          {questions.map(question => {
            return(
              <Question 
                key={question.id}
                content={question.content}
                author={question.author}
              />
            )
          })}
        </div>
      </main>
    </div>
  )
}