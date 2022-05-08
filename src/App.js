import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/layout-components/home';
import { createTheme, ThemeProvider } from '@mui/material';
import { green, red } from '@mui/material/colors';
import { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";


const theme = createTheme({
  palette: {
    primary: {
      main: '#000000'
    },
    background: {
      main: '#18191e',
      light: '#191d22',
      different: '#393047',
      purple: '#490064',
      radio: '#633cbc',
      black: '#000000',
      cardBackground: '#252732',
      white:'#f2f2f2',
      chartColor:'#282A36'
    },
    text: {
      main: '#564766',
      light: '#cfcde3',
      main2: '#71678b',
      white: '#ffffff',
      offwhite: '#f2f2f2',
      purple: '#490064',
      black: '#000000',
      special: red
    }
  }
})

function App() {

  useEffect(() => {
    AOS.init(
      { duration: 2000 }
    )
    AOS.refresh()
  })

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
        </Routes>
      </Router></ThemeProvider>
  );
}

export default App;
