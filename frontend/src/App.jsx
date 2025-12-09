import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Home from "./pages/Home/Home"
import Vendor from './pages/Vendor/Vendor'
import Settings from './pages/Settings/Settings'
import RFP from './pages/RFP/RFP'
import Dashboard from './pages/Dashboard/Dashboard'
function App() {

  return (
    <div className="app-container">
      <Header />
      <Routes>
        <Route path='/' Component={Home} />
        <Route path='/vendor' Component={Vendor} />
        <Route path='/settings' Component={Settings} />
        <Route path="/rfp" Component={RFP} />
        <Route path="/dashboard/:refid" element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App
