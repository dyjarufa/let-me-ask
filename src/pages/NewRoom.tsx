import illustration from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import { Link } from 'react-router-dom';

import '../styles/auth.scss'
import { Button } from '../components/Button'; 
import { useAuth } from '../hooks/useAuth';


 export function NewRoom() {
  //  const { user } = useAuth();

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
            <form>
              <input 
                type="text" 
                placeholder="room name"
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