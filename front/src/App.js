import logo from './logo.svg';
import './App.css';
import { QuestContainer } from './components/QuestContainer/QuestContainer';
import { AuthProvider } from './Context/AuthContext';
import { PruebaProvider } from './Context/ContextPrueba';
import { Login } from './components/Auth/Login';

function App() {

  return (
    <div className="App">
      <AuthProvider>
        <PruebaProvider>
          <Login />
          {/* <QuestContainer/> */}
        </PruebaProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
