import logo from './logo.svg';
import './App.css';
import { QuestContainer } from './components/QuestContainer/QuestContainer';
import { AuthProvider } from './Context/AuthContext';
import { PruebaProvider } from './Context/ContextPrueba';

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <PruebaProvider>
        <QuestContainer/>
      </PruebaProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
