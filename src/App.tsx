import { FC } from 'react';
import Register from './Components/Register'
import Login from './Components/Login';
import Layout from './Components/Layout';
import { Routes, Route } from 'react-router-dom';
import AdminLogin from './Components/AdminLogin';
import UserLogin from './Components/UserLogin'


const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        
      </Route>
    </Routes>
  );
}

export default App;
