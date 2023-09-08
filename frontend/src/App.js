import './App.css';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import 'Routes' instead of 'Switch'
import CreateEmployeeComponent from './components/CreateEmployeeComponent';


function App() {
  return (
    
    <div>
      <Router>
        <HeaderComponent />
        <div className="container">
          <Routes>
            <Route path="/" element={<ListEmployeeComponent />} /> 
            <Route path="/employees" element={<ListEmployeeComponent />} />
            <Route path="/add-employee" element={<CreateEmployeeComponent />} />  
          </Routes>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
