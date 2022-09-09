import Login from "./pages/Login";
import {Route, Routes} from "react-router-dom";
import Game from "./pages/Game";
import Statistics from "./pages/Statistics";

import './scss/style.scss'

function App() {
  return (
          <div className="App">
             <Routes>
                 <Route path='/' element={<Login/>}/>
                 <Route path='/game' element={<Game/>}/>
                 <Route path='/statistics' element={<Statistics/>}/>
             </Routes>
          </div>
  );
}

export default App;
