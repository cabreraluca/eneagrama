import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { QuestionsProvider } from './context/QuestionsContext';
import { AdminRouter } from './router/AdminRouter';
import { WebRouter } from './router/WebRouter';


function App() {

  return (
    <div className="w-[100%]">
      <AuthProvider>
        <BrowserRouter>
          <QuestionsProvider>
            <AdminRouter />
            <WebRouter />
          </QuestionsProvider>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
