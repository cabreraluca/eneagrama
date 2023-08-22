import logo from './logo.svg';
import './App.css';
import { QuestContainer } from './components/QuestContainer/QuestContainer';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <QuestContainer/>
      </AuthProvider>
    </div>
  );
}

export default App;
