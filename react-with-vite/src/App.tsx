import './App.css'
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './Routes/Routes';

const App = () => {
  return (
    <BrowserRouter>
    <div className="App">
      <header className="App-header">
        <Routes />
      </header>
    </div>
    </BrowserRouter>
  )
}

export default App
