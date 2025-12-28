import { 
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import AutorizationPage from './components/AutorizationPage/AutorizationPage';

function App() {
  return (
    <>
      <header>
        <div>
          <svg
          width={40}
          height={40}
          >
            <use href='/public/sprite.svg#icon-Craftwork' />
          </svg>
          <p>VocabBuilder</p>
        </div>
      </header>
    
      <main>
        <Routes>
          <Route path='/' element={<Navigate to='/register' replace />} />
          <Route path='/login' element={<AutorizationPage />} />
        </Routes>
      </main>
    </>
  )
}

export default App
