import './App.css';
import {BrowserRouter as Router, Routes , Route} from "react-router-dom";
import { Home } from './pages/home';
import { Auth } from './pages/auth';
import { Create_recipe } from './pages/createRecipe';
import { Save_recipe } from './pages/saveRecipe';
import { Navbar } from './components/navbar';
function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/auth" element={<Auth/>}/>
          <Route path="/create-recipe" element={<Create_recipe/>}/>
          <Route path="/save-recipe" element={<Save_recipe/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
