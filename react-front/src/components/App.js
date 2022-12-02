import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecommendChannels from './RecommendChannels';
import Home from './Home';
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
function App() {

  return (
    <>
    <div className="App">
        <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/recommendchannels" element={<RecommendChannels />} />
        </Routes>
        </Router>
      
    </div>
    </>
  );
}

export default App;