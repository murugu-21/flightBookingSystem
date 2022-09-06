import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Home } from './pages/Home';
import { SignUp } from './pages/SignUp';

function App() {
  const handleLogOut = (e) => {
    const token = localStorage.getItem('token')
    if (token) localStorage.removeItem('token')
    const user = localStorage.getItem('user')
    if (user) localStorage.removeItem('user')
  }
  return (
    <>
      <Routes>
        <Route path="/" element={SignUp} />
        <Route path="/home">
          <Home />
          <button onClick={handleLogOut}>Log out</button>
        </Route>
      </Routes>
    </>
  );
}

export default App;
