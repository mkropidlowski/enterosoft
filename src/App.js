import './App.css';

import {BrowserRouter, Route, Routes} from "react-router-dom";
import LeaderBoard from './pages/LeaderBoard';
import SearchList from './pages/SearchList';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LeaderBoard />} />
        <Route path="SearchList/:id" element={<SearchList/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
