import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import Home from './components/layout-components/home';
import Appbar from './components/Appbar';
import { Grid } from '@mui/material';
import GetBox from './components/layout-components/getBox';
import About from './components/about';
import SignUp from './features/authentication/signUp';
import SignIn from './features/authentication/signIn';
import DashBoard from './components/dashBoard';
import PollDetails from './components/polldetails';
import { useDispatch } from 'react-redux';
import { getGlobalPIDSList } from './features/voterSlice';
import { useEffect, useState } from 'react';
import VoterSubscriptions from './components/voterDetails';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';


function App() {

  const dispatch = useDispatch()
  const [once, setOnce] = useState(false)
  useEffect(() => {
    // dispatch(getGlobalPIDSList())
    if(!once){
      setOnce(true)
    }
    console.log('times')
  }, [once])
  
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <Routes>
      <Route exact path='/' element={<Home />} />
      <Route exact path='/signUp' element={<SignUp />} />
        <Route exact path='/signIn' element={<SignIn />} />
        <Route exact path='/about' element={<About />} />
        <Route exact path='/layout' element={<Layout />} />
        <Route exact path='/dashboard' element={<DashBoard />} />
        <Route exact path='/pollsdetails' element={<PollDetails />} />
        <Route exact path='/vpd' element={<VoterSubscriptions />} />        
      </Routes>
    </Router></ThemeProvider>
  );
}

export default App;
