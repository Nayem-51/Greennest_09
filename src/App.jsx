import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Profile from './pages/Profile.jsx'
import PlantDetails from './pages/PlantDetails.jsx'
import ProtectedRoute from './routes/ProtectedRoute.jsx'

export default function App(){
  return (
    <div className="app">
      <Navbar />
      <ToastContainer limit={2} newestOnTop closeOnClick pauseOnFocusLoss={false} />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/plants" element={<Home />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/plants/:id" element={
            <ProtectedRoute>
              <PlantDetails />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
