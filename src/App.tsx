import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';

import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';
import { Room } from './pages/Room';



function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
      {/* Switch não permite usar duas rotas sejam usadas ao mesmo tempo */}
        <Switch> 
          <Route path="/" exact component={Home}/>
          <Route path="/rooms/new" component={NewRoom}/>
          <Route path="/rooms/:id" component={Room}/>
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
