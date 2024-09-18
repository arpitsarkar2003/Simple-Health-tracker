import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AddPage from './pages/AddPage';
import EditPage from './pages/EditPage';
import HealthRecordDetail from './components/HealthRecordDetail';
import AddHealthRecord from './components/AddHealthRecord';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
          <Route path="/health-records/:id" element={<HealthRecordDetail />} />
          <Route path="/add-record" element={<AddHealthRecord />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
