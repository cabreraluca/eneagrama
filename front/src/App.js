import './App.css';
import { QuestContainer } from './components/QuestContainer/QuestContainer';
import { AuthProvider } from './context/AuthContext';
import { PruebaProvider } from './context/ContextPrueba';
import { Login } from './components/Auth/Login';
import { Users } from './components/Users/Users';

function App() {

  return (
    <div className="App">
      <AuthProvider>
        <PruebaProvider>
          <Login />
          <QuestContainer/>
        </PruebaProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
