import Login from "./components/Login";
import {Route, Routes} from "react-router-dom";
import Game from "./pages/Game/Game";
import Statistics from "./pages/Statistics/Statistics";

import './style.scss'

function App() {
  return (
          <div className="App">
             <Routes>
                 <Route path='/login' element={<Login/>}/>
                 <Route path='/game' element={<Game/>}/>
                 <Route path='/statistics' element={<Statistics/>}/>
             </Routes>
          </div>

  );
}

export default App;
