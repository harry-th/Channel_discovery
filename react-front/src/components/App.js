import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecommendChannels from './RecommendChannels';
import Home from './Home';
import Nav from './Nav';
function App() {

  return (

    <div className="App">
      <Router>
        <Nav/>
        <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path="/recommendchannels" element={<RecommendChannels/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;