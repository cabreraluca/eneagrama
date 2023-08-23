import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PruebaProvider } from './context/ContextPrueba';
import { AdminRouter } from './router/AdminRouter';
import { WebRouter } from './router/WebRouter';

function App() {

  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <PruebaProvider>
            <AdminRouter />
            <WebRouter />
          </PruebaProvider>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
