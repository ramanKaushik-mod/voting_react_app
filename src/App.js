import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/layout-components/home';
import { createTheme, ThemeProvider } from '@mui/material';
import { green, red } from '@mui/material/colors';
import { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import { useDispatch, useSelector } from 'react-redux'
import { getTheme, sendFormDataThunk } from './features/mainSlice'
import { Helmet } from 'react-helmet'
import { useStyles } from './styles/styles';



const dtheme = createTheme({
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
      white: '#f2f2f2',
      chartColor: '#282A36',

      appbar: '#191d22',
      footer: '#000111',
      button: '#490064'
    },
    text: {
      accent: '#cfcde3',
      main: '#564766',
      light: '#cfcde3',
      main2: '#71678b',
      white: '#ffffff',
      offwhite: '#f2f2f2',
      purple: '#490064',
      black: '#000000',
      special: red,
      footer: '#cfcde3'
    }
  }
})

const ltheme = createTheme({
  palette: {
    primary: {
      main: '#000000'
    },
    background: {
      main: '#f3f5f9',
      light: '#f9fbff',
      different: '#393047',
      purple: '#490064',
      radio: '#633cbc',
      black: '#000000',
      cardBackground: '#490064',
      white: '#f2f2f2',
      chartColor: '#490068',

      appbar: '#490064',
      footer: '#490064',
      button: '#490064'
    },
    text: {
      accent: '#47298b',
      main: '#564766',
      light: '#cfcde3',
      main2: '#71678b',
      white: '#ffffff',
      offwhite: '#f2f2f2',
      purple: '#490064',
      black: '#000000',
      special: red,
      footer: '#cfcde3'
    }
  }
})
function App() {
  const dispatch = useDispatch()
  const theme = useSelector(getTheme)
  const classes = useStyles()
  useEffect(() => {
    AOS.init(
      { duration: 2000 }
    )
    AOS.refresh()
    dispatch(sendFormDataThunk(JSON.stringify({ type: 'GET' })))

    // !theme

    //   ? document.body.style.backgroundImage = 'linear-gradient(90deg, #c94b4b 0%, #4b134f 46%)'
    //   : document.body.style.backgroundColor = "#f3f5f9"
  }, [theme])

  return (
    <div
    >
      <ThemeProvider theme={!theme ? dtheme : ltheme}>
        <Router>
          <Routes>
            <Route exact path='/' element={<Home />} />
          </Routes>
        </Router></ThemeProvider></div>
  );
}

export default App;
