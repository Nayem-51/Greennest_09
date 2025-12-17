import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'

export default function Navbar(){
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef(null)
  const handleLogout = async ()=>{
    await logout()
    navigate('/')
    setOpen(false)
    setUserMenuOpen(false)
  }
  useEffect(()=>{
    const onDocClick = (e)=>{
      if(userMenuRef.current && !userMenuRef.current.contains(e.target)){
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('click', onDocClick)
    return ()=> document.removeEventListener('click', onDocClick)
  }, [])
  return (
    <header className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">GreenNest</Link>
        <nav aria-label="Primary">
          <Link to="/">Home</Link>
          <Link to="/plants">Plants</Link>
          <Link to="/profile">My Profile</Link>
        </nav>
      </div>
      <button
        className="menu-toggle"
        aria-label="Toggle menu"
        aria-controls="mobile-menu"
        aria-expanded={open}
        onClick={()=> setOpen(o=>!o)}
      >
        {open ? (
          // Close icon
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        ) : (
          // Hamburger icon
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        )}
      </button>
      <div className="nav-right">
        {user ? (
          <div className="user-menu" ref={userMenuRef}>
            <button
              className="avatar-btn"
              aria-haspopup="menu"
              aria-expanded={userMenuOpen}
              onClick={()=> setUserMenuOpen(v=>!v)}
            >
              <img
                src={user.photoURL || '/avatar.svg'}
                alt="avatar"
                className="avatar"
                referrerPolicy="no-referrer"
                onError={(e)=>{ e.currentTarget.src = '/avatar.svg' }}
              />
            </button>
            {userMenuOpen && (
              <div className="menu-dropdown" role="menu">
                <div className="menu-header">{user.displayName || user.email}</div>
                <button role="menuitem" className="menu-item" onClick={()=>{ navigate('/profile'); setUserMenuOpen(false) }}>My Profile</button>
                <button role="menuitem" className="menu-item danger" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <div className="auth-actions">
            <Link to="/login" className="btn">Login</Link>
            <Link to="/signup" className="btn btn-outline">Register</Link>
          </div>
        )}
      </div>
      {open && (
        <div id="mobile-menu" className="mobile-menu" role="dialog" aria-modal="true">
          <div className="mobile-section">
            <Link to="/" onClick={()=> setOpen(false)}>Home</Link>
            <Link to="/plants" onClick={()=> setOpen(false)}>Plants</Link>
            <Link to="/profile" onClick={()=> setOpen(false)}>My Profile</Link>
          </div>
          <div className="mobile-section">
            {user ? (
              <div className="mobile-user">
                <div className="user-id">
                  <img
                    src={user.photoURL || '/avatar.svg'}
                    alt="avatar"
                    className="avatar"
                    referrerPolicy="no-referrer"
                    onError={(e)=>{ e.currentTarget.src = '/avatar.svg' }}
                  />
                  <span>{user.displayName || user.email}</span>
                </div>
                <button onClick={handleLogout} className="btn btn-outline full">Logout</button>
              </div>
            ) : (
              <div className="mobile-auth">
                <Link to="/login" className="btn full" onClick={()=> setOpen(false)}>Login</Link>
                <Link to="/signup" className="btn btn-outline full" onClick={()=> setOpen(false)}>Register</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
