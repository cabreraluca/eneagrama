import logo from './logo.svg';
import './App.css';
import { QuestContainer } from './components/QuestContainer/QuestContainer';
import { PruebaProvider } from './Context/ContextPrueba';

function App() {
  return (
    <div className="App">
      <PruebaProvider>
        <QuestContainer/>
      </PruebaProvider>
    </div>
  );
}

export default App;
