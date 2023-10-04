import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import ExerciceOne from "./pages/ExerciceOne/ExerciceOne";
import ExerciceTwo from "./pages/ExerciceTwo/ExerciceTwo";
import ExerciceThree from "./pages/ExerciceThree/ExerciceThree";
import Navbar from "./components/navbar/Navbar";
import { StorageProvider } from "./store/StorageContext";

function App() {
  return (
    <StorageProvider>
      <HashRouter>
        <div className="App">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<ExerciceOne />}></Route>
              <Route path="two" element={<ExerciceTwo />}></Route>
              <Route path="three" element={<ExerciceThree />}></Route>
            </Routes>
          </main>
        </div>
      </HashRouter>
    </StorageProvider>
  );
}

export default App;
