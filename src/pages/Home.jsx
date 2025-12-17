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

      <section className="section">
        <h2>Top Rated Indoor Plants</h2>
        <div className="grid">
          {topRated.map(p=> (
            <div className="card" key={p.plantId}>
              <img
                src={p.image}
                alt={p.plantName}
                referrerPolicy="no-referrer"
                loading="lazy"
                onError={(e)=>{ e.currentTarget.src = '/plant-placeholder.svg' }}
              />
              <div className="card-body">
                <h3>{p.plantName}</h3>
                <p>${p.price} · ⭐ {p.rating}</p>
                <Link to={`/plants/${p.plantId}`} className="btn">View Details</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Plant Care Tips</h2>
        <div className="tips">
          <div>
            <h3>Watering</h3>
            <p>Water when the top 1–2 inches of soil are dry.</p>
          </div>
          <div>
            <h3>Sunlight</h3>
            <p>Bright, indirect light suits most indoor plants.</p>
          </div>
          <div>
            <h3>Fertilizing</h3>
            <p>Feed monthly during growing season with balanced fertilizer.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Meet Our Green Experts</h2>
        <div className="grid">
          {[
            {name:'Ava Stone',role:'Air Purifying Plants'},
            {name:'Liam Moss',role:'Low-light Care'},
            {name:'Mia Fern',role:'Propagation & Soil'},
            {name:'Noah Leaf',role:'Decor & Styling'},
          ].map((e,i)=> {
            const lowerHyphen = e.name.toLowerCase().replace(/\s+/g,'-') // ava-stone
            const camel = e.name.replace(/\s+/g,'')                      // AvaStone
            const lowerCamel = camel.toLowerCase()                        // avastone
            const baseCandidates = [
              `/images/experts/${lowerHyphen}`,
              `/images/experts/${camel}`,
              `/images/experts/${lowerCamel}`
            ]
            const extCandidates = ['.jpg','.webp','.png']
            const initial = `${baseCandidates[0]}${extCandidates[0]}`
            const handleImgError = (ev)=>{
              const img = ev.currentTarget
              const idxBase = parseInt(img.dataset.baseIdx || '0', 10)
              const idxExt = parseInt(img.dataset.extIdx || '0', 10)
              let nextBase = idxBase
              let nextExt = idxExt + 1
              if(nextExt >= extCandidates.length){
                nextExt = 0
                nextBase = idxBase + 1
              }
              if(nextBase >= baseCandidates.length){
                img.src = '/avatar.svg'
                img.removeAttribute('data-base-idx')
                img.removeAttribute('data-ext-idx')
                return
              }
              img.dataset.baseIdx = String(nextBase)
              img.dataset.extIdx = String(nextExt)
              img.src = `${baseCandidates[nextBase]}${extCandidates[nextExt]}`
            }
            return (
            <div className="card" key={i}>
              <img
                  src={initial}
                alt={e.name}
                referrerPolicy="no-referrer"
                loading="lazy"
                  data-base-idx="0"
                  data-ext-idx="0"
                  onError={handleImgError}
              />
              <div className="card-body">
                <h3>{e.name}</h3>
                <p>{e.role}</p>
              </div>
            </div>
            )
          })}
        </div>
      </section>

      <section className="section">
        <h2>Eco Decor Ideas</h2>
        <div className="grid">
          {[
            {
              title:'Entryway Greeter',
              tip:'Use a tall snake plant to purify air and welcome guests.'
            },
            {
              title:'Shelf Style',
              tip:'Mix trailing pothos with books for a lively vignette.'
            },
            {
              title:'Calm Corner',
              tip:'Peace lily near a window adds bloom and serenity.'
            }
          ].map((i,idx)=> (
            <div className="card" key={idx}>
              <div className="card-body">
                <h3>{i.title}</h3>
                <p>{i.tip}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Plant of the Week</h2>
        {plantOfWeek ? (
          <div className="card pow-card">
            <img src={plantOfWeek.image} alt={plantOfWeek.plantName} onError={(e)=>{ e.currentTarget.src='/plant-placeholder.svg' }} />
            <div className="card-body">
              <h3>{plantOfWeek.plantName}</h3>
              <p>${plantOfWeek.price} · ⭐ {plantOfWeek.rating}</p>
              <p>{plantOfWeek.description?.slice(0,120) || 'A perfect pick for style and air purification.'}</p>
              <Link to={`/plants/${plantOfWeek.plantId}`} className="btn">Explore</Link>
            </div>
          </div>
        ) : (
          <p>Discover a star plant each week for your space.</p>
        )}
      </section>
    </div>
  )
}
