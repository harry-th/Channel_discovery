import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecommendChannels from './RecommendChannels';
import Home from './Home';
function App() {

  return (

    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/recommendchannels" element={<RecommendChannels />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;