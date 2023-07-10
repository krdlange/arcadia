// import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Mygames from "./pages/Mygames";
import Gameprofile from "./pages/Gameprofile";
import Searchresults from "./pages/Searchresults";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
// import Homepage from "./pages/Homepage";

function App() {
  
  return (
    <div className="App">
      <NavigationBar />
      <Routes>
        <Route path="dashboard" element={<Dashboard/>}></Route>
        <Route path="searchresults" element={<Searchresults />}></Route>
        <Route path="mygames" element={<Mygames />}></Route>
        <Route path="gameprofile/:id" element={<Gameprofile />}></Route>
        {/* <Route path="/" element={<Homepage />}></Route> */}
      </Routes>
    <Footer />
    </div>
  );
}

export default App;

