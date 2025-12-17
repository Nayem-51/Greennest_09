import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'

export default function PlantDetails(){
  const { id } = useParams()
  const [plant,setPlant] = useState(null)
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [msg,setMsg] = useState('')

  useEffect(()=>{
    fetch('/plants.json').then(r=>r.json()).then(data=>{
      const found = data.find(p=>String(p.plantId)===String(id))
      setPlant(found)
    })
  },[id])

  const handleBook = (e)=>{
    e.preventDefault()
    setMsg('Consultation booked! We will email details soon.')
    toast.success('Consultation booked successfully!', { position:'top-center', autoClose: 1500 })
    setName('')
    setEmail('')
  }

  if(!plant) return <p>Loading...</p>

  return (
    <div className="details">
      <div className="details-top">
        <img
          className="details-img"
          src={plant.image}
          alt={plant.plantName}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={(e)=>{ e.currentTarget.src = '/plant-placeholder.svg' }}
        />
        <div>
          <h2>{plant.plantName}</h2>
          <p>{plant.description}</p>
          <p><strong>Category:</strong> {plant.category} · <strong>Care:</strong> {plant.careLevel}</p>
          <p><strong>Price:</strong> ${plant.price} · ⭐ {plant.rating} · <strong>Stock:</strong> {plant.availableStock}</p>
          <p><strong>Provider:</strong> {plant.providerName}</p>
        </div>
      </div>

      <form className="form" onSubmit={handleBook}>
        <h3>Book Consultation</h3>
        <label>Name</label>
        <input value={name} onChange={e=>setName(e.target.value)} required />
        <label>Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required />
        <button className="btn" type="submit">Book Now</button>
        {msg && <p className="success">{msg}</p>}
      </form>
    </div>
  )
}
