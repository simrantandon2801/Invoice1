import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Panel from './Panel'
import Header from './Header';
import Footer from './Footer';
import Signup1 from './Signup1';
import Otp1 from './Otp1';
import Entries1 from './Entries1';
import Login1 from './Login1';
import Account from './Account'
import PayslipForm from './Payslip';
import PayslipApp from './UserPage';
import LandingPage from './Landingpage';
function App() {
  return (
 <Routes>
  
  <Route path="panel" element={<Panel />} />
  <Route path='/' element={<Panel />} />
  <Route path="Header" element={<Header />} />
  <Route path="Footer" element={<Footer />} />
  <Route path="Signup" element={<Signup1 />} />
  <Route path="Otp" element={<Otp1 />} />
  <Route path="Entries" element={<Entries1 />} />
  <Route path="Login" element={<Login1 />} />
		  <Route path="account" element={<Account />} />
		  <Route path='payslip' element={<PayslipForm />} />
		  <Route path='records' element={<PayslipApp />} />
		  <Route path='landing' element={<LandingPage />} />
  </Routes>
  );
}

export default App;
