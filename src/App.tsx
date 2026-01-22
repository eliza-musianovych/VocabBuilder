import { 
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header/Header';
import PrivateRoutes from './routing/PrivateRoutes';
import Dictionary from './pages/Dictionary';
import Sidebar from './components/Sidebar/Sidebar';
import { useState } from 'react';
import PublicRoutes from './routing/PublicRoutes';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const openMenu = () => setIsMenuOpen(true);

  return (
    <>
    <Toaster position='top-right'/>
      <Header onMenuOpen={openMenu}/>
      <Sidebar isOpen={isMenuOpen} onClose={closeMenu} />
    
      <Routes>
        <Route path='/' element={<Navigate to='/register' replace />} />
        
        <Route element={<PublicRoutes />}>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route path='/dictionary' element={<Dictionary/>} />
        </Route>     
      </Routes>
    </>
  )
};

export default App;

