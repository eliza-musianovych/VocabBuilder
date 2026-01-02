import { 
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header/Header';

function App() {
  return (
    <>
    <Toaster position='top-right'/>
      <Header />
    
      <main>
        <Routes>
          <Route path='/' element={<Navigate to='/register' replace />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </main>
    </>
  )
};

export default App;
