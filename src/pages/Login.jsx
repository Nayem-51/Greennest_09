import { useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login(){
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [show,setShow] = useState(false)
  const [error,setError] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const { login, resetPassword, googleSignIn } = useAuth()
  const from = location.state?.from?.pathname || '/'

  const handleSubmit = async (e)=>{
    e.preventDefault()
    setError('')
    try{
      await login(email,password)
      toast.success('Logged in successfully', { position:'top-center', autoClose: 1200 })
      navigate(from,{replace:true})
    }catch(err){
      setError(err.message)
      toast.error(err.message || 'Login failed', { position:'top-center', autoClose: 1800 })
    }
  }

  const handleReset = async ()=>{
    try{
      await resetPassword(email)
      toast.info('Reset email sent. Check inbox.', { position:'top-center', autoClose: 1800 })
    }catch(err){
      setError(err.message)
      toast.error(err.message || 'Reset failed', { position:'top-center', autoClose: 1800 })
    }
  }

  const handleGoogle = async ()=>{
    try{
      await googleSignIn()
      toast.success('Google login successful', { position:'top-center', autoClose: 1200 })
      navigate(from,{replace:true})
    }catch(err){
      setError(err.message)
      toast.error(err.message || 'Google login failed', { position:'top-center', autoClose: 1800 })
    }
  }

  return (
    <div className="auth">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required />
        <label>Password</label>
        <div className="password">
          <input value={password} onChange={e=>setPassword(e.target.value)} type={show?'text':'password'} required />
          <button type="button" className="link" onClick={()=>setShow(s=>!s)}>{show?'Hide':'Show'}</button>
        </div>
        {error && <p className="error">{error}</p>}
        <button className="btn" type="submit">Login</button>
        <button type="button" className="btn btn-outline" onClick={handleGoogle}>Continue with Google</button>
        <button type="button" className="link" onClick={handleReset}>Forgot Password?</button>
      </form>
      <p>Don't have an account? <Link to="/signup">Register</Link></p>
    </div>
  )
}
