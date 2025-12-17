import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

export default function Home(){
  const [plants, setPlants] = useState([])

  useEffect(()=>{
    fetch('/plants.json').then(r=>r.json()).then(setPlants)
  },[])

  const topRated = [...plants].sort((a,b)=>b.rating - a.rating).slice(0,6)
  const plantOfWeek = plants.length ? [...plants].sort((a,b)=> b.rating - a.rating || b.price - a.price)[0] : null

  return (
    <div className="home">
      <section className="hero">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
        >
          {[
            {
              img:'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1600&auto=format&fit=crop',
              title:'Bring Nature Indoors',
              subtitle:'Breathe easy, live calmly.'
            },
            {
              img:'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?q=80&w=1600&auto=format&fit=crop',
              title:'Healthy, Happy Homes',
              subtitle:'Plants for every light and schedule.'
            },
            {
              img:'https://images.unsplash.com/photo-1487147264018-f937fba0c817?q=80&w=1600&auto=format&fit=crop',
              title:'Style Your Space',
              subtitle:'Create a serene green corner.'
            }
          ].map((s,i)=> (
            <SwiperSlide key={i}>
              <div className="hero-slide" style={{
                backgroundImage:`url(${s.img})`,
                backgroundSize:'cover', backgroundPosition:'center',
                borderRadius:16, height:260, display:'flex', alignItems:'center', justifyContent:'center', color:'#fff'
              }}>
                <div style={{textAlign:'center', textShadow:'0 2px 8px rgba(0,0,0,.35)'}}>
                  <h1>{s.title}</h1>
                  <p>{s.subtitle}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

     