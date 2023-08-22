import logo from './logo.svg';
import './App.css';
import { QuestContainer } from './components/QuestContainer/QuestContainer';
<<<<<<< HEAD
import { AuthProvider } from './context/AuthContext';
=======
import { PruebaProvider } from './Context/ContextPrueba';
>>>>>>> 6e1fdd652a1126c945b94581a0b37165a0e748ea

function App() {
  return (
    <div className="App">
<<<<<<< HEAD
      <AuthProvider>
        <QuestContainer/>
      </AuthProvider>
=======
      <PruebaProvider>
        <QuestContainer/>
      </PruebaProvider>
>>>>>>> 6e1fdd652a1126c945b94581a0b37165a0e748ea
    </div>
  );
}

export default App;
