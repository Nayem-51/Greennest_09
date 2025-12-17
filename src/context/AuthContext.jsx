import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import { auth } from '../firebase/firebase.config.js'

const AuthContext = createContext(null)
export const useAuth = ()=> useContext(AuthContext)

export default function AuthProvider({ children }){
  const [user,setUser] = useState(null)
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth,(u)=>{ setUser(u||null); setLoading(false) })
    return ()=>unsub()
  },[])

  const login = (email,password)=> signInWithEmailAndPassword(auth,email,password)
  const signup = (email,password)=> createUserWithEmailAndPassword(auth,email,password)
  const resetPassword = (email)=> sendPasswordResetEmail(auth,email)
  const googleSignIn = ()=> signInWithPopup(auth,new GoogleAuthProvider())
  const logout = ()=> signOut(auth)
  const updateUserProfile = (data)=> updateProfile(auth.currentUser,data)

  const value = { user, login, signup, resetPassword, googleSignIn, logout, updateUserProfile }

  if(loading) return <div className="loading">Loading...</div>
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
