import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import logo from './img/logo_leah_genish.png';
import { Box } from '@mui/material';
import AddDecleration from './components/AddDecleration';
import Thankyou from './components/Thankyou';
import Decleration from './components/Decleration';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ccd5ae',
    },
    secondary: {
      main: '#d6ccc2',
    },
  },
  typography: {
    fontFamily: 'revert',
    fontSize: 16
  },

});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [name, setName] = useState('')

  const handleLogin = (user) => {
    setIsLoggedIn(true)
    setName(user.name)
    console.log(name, isLoggedIn);
  }
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#d1b3b5' }}
      >
        <img src={logo} alt="logo" width='100' height='100' />
      </Box>
      <Router>
        <Routes>
          <Route path='/login' element={isLoggedIn ? <Home name={name} /> : <Login onLogin={handleLogin} />} />
          <Route path="/home" element={isLoggedIn ? <Home name={name} /> : <Navigate to="/login" replace />} />
          <Route path='/register' Component={Register} />
          <Route path='/' Component={AddDecleration} />
          <Route path='/thankyou' Component={Thankyou} />
          <Route path='//declerations/:decId' element={<Decleration />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
