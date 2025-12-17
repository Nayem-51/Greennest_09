import { useAuth } from '../context/AuthContext.jsx'
import { useState } from 'react'
import { toast } from 'react-toastify'

export default function Profile(){
  const { user, updateUserProfile } = useAuth()
  const [name,setName] = useState(user?.displayName || '')
  const [photo,setPhoto] = useState(user?.photoURL || '')
  const [msg,setMsg] = useState('')

  const handleUpdate = async ()=>{
    try{
      await updateUserProfile({ displayName:name, photoURL:photo })
      setMsg('Profile updated successfully!')
      toast.success('Profile updated', { position:'top-center', autoClose: 1200 })
    }catch(err){
      setMsg(err.message)
      toast.error(err.message || 'Update failed', { position:'top-center', autoClose: 1800 })
    }
  }

  return (
    <div className="profile">
      <h2>My Profile</h2>
      <img
        src={(user?.photoURL ?? photo) || '/avatar.svg'}
        alt="user"
        className="avatar-lg"
        referrerPolicy="no-referrer"
        onError={(e)=>{ e.currentTarget.src = '/avatar.svg' }}
      />
      <p><strong>Name:</strong> {user?.displayName || name || 'N/A'}</p>
      <p><strong>Email:</strong> {user?.email}</p>

      <div className="form-inline">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Update name" />
        <input value={photo} onChange={e=>setPhoto(e.target.value)} placeholder="Update photo URL" />
        <button className="btn" onClick={handleUpdate}>Update Profile</button>
      </div>
      {msg && <p className="success">{msg}</p>}
    </div>
  )
}
