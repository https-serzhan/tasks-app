import './styles/App.css'
import { Link, Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth/Auth.jsx'
import Login from './pages/Auth/Login.jsx'
import Signup from './pages/Auth/Signup.jsx'
import Details from './pages/Details.jsx'
import Home from './pages/Home.jsx'
import Notfound from './pages/Notfound.jsx'

function App() {
  return (
    <div className="appShell">
      <nav className="topNav">
        <Link to="/">Home</Link>
        <Link to="/auth">Auth</Link>
        <Link to="/details">Details</Link>
      </nav>

      <main className="pageContent">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />}>
            <Route index element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
          <Route path="/details" element={<Details />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
