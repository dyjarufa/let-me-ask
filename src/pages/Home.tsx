import illustration from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import  googleIconImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss'
import { Button } from '../components/Button';

export function Home(){
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
            <button className="create-room">
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