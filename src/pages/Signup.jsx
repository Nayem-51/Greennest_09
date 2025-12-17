import { useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const isValidPassword = (p)=>{
  const hasUpper = /[A-Z]/.test(p)
  const hasLower = /[a-z]/.test(p)
  const longEnough = p.length >= 6
  return hasUpper && hasLower && longEnough
}

export default function Signup(){
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [photo,setPhoto] = useState('')
  const [password,setPassword] = useState('')
  const [show,setShow] = useState(false)
  const [error,setError] = useState('')
  const navigate = useNavigate()
  const { signup, googleSignIn, updateUserProfile } = useAuth()

  const handleSubmit = async (e)=>{
    e.preventDefault()
    setError('')
    if(!isValidPassword(password)){
      setError('Password must be 6+ chars, include upper & lower case.')
      toast.error('Invalid password requirements', { position:'top-center', autoClose: 1800 })
      return
    }
    try{
      const userCred = await signup(email,password)
      await updateUserProfile({ displayName: name, photoURL: photo })
      toast.success('Registered successfully', { position:'top-center', autoClose: 1200 })
      navigate('/')
    }catch(err){
      setError(err.message)
      toast.error(err.message || 'Signup failed', { position:'top-center', autoClose: 1800 })
    }
  }

  const handleGoogle = async ()=>{
    try{
      await googleSignIn()
      toast.success('Google signup/login successful', { position:'top-center', autoClose: 1200 })
      navigate('/')
    }catch(err){
      setError(err.message)
      toast.error(err.message || 'Google auth failed', { position:'top-center', autoClose: 1800 })
    }
  }

  return (
    <div className="auth">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>Name</label>
        <input value={name} onChange={e=>setName(e.target.value)} required />
        <label>Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required />
        <label>Photo URL</label>
        <input value={photo} onChange={e=>setPhoto(e.target.value)} />
        <label>Password</label>
        <div className="password">
          <input value={password} onChange={e=>setPassword(e.target.value)} type={show?'text':'password'} required />
          <button type="button" className="link" onClick={()=>setShow(s=>!s)}>{show?'Hide':'Show'}</button>
        </div>
        {error && <p className="error">{error}</p>}
        <button className="btn" type="submit">Register</button>
        <button type="button" className="btn btn-outline" onClick={handleGoogle}>Continue with Google</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  )
}
