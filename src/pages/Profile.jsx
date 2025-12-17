import { useAuth } from '../context/AuthContext.jsx'
import { useState } from 'react'
import { toast } from 'react-toastify'

export default function Profile(){
  const { user, updateUserProfile } = useAuth()
  const [name,setName] = useState(user?.displayName || '')
  const [photo,setPhoto] = useState(user?.photoURL || '')
  const [msg,setMsg] = useState('')

  