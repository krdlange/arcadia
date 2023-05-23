// import "./App.css";
import { Routes, Route } from "react-router-dom";
import Mygames from "./pages/Mygames";
import Gameprofile from "./pages/Gameprofile";
import Searchresults from "./pages/Searchresults";
import NavigationBar from "./components/Navigationbar";

function App() {
  
  return (
    <div className="App">
      <NavigationBar />
      <Routes>
        <Route path="searchresults" element={<Searchresults />}></Route>
        <Route path="mygames" element={<Mygames />}></Route>
        <Route path="gameprofile/:id" element={<Gameprofile />}></Route>
      </Routes>
    </div>
  );
}

export default App;

