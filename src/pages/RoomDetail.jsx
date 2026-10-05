import { Link, useParams } from 'react-router-dom'
import { Shirt, Tv, Sunset, Bath, ShowerHead, DoorClosed, Users } from 'lucide-react'
import Img from '../components/Img'
import WhatsAppButton from '../components/WhatsAppButton'
import useMeta from '../utils/useMeta'
import { getRoom } from '../data/rooms'
import { money, roomMsg } from '../utils/whatsapp'
const icons = { 'Walk-in closet': Shirt, TV: Tv, Balcony: Sunset, Toilet: ShowerHead, Bathroom: Bath, Ensuite: DoorClosed }
export default function RoomDetail() {
  const room = getRoom(useParams().id)
  useMeta(room ? `${room.name} in Jahi, Abuja | The Gabshomes` : 'Apartment not found | The Gabshomes', room ? `${room.name} shortlet in Jahi, Abuja from ${money(room.price)} per night. Ensuite with balcony and walk-in closet.` : 'Apartment not found')
  if (!room) return <section className="sec-pad"><div className="wrap" style={{ paddingTop: 100 }}><h1>Apartment not found</h1><Link to="/#apartments" className="btn btn-primary" style={{ marginTop: 20 }}>See all apartments</Link></div></section>
  return (
    <>
      <div className="page-hero"><div className="wrap"><div className="eyebrow">Apartment</div><h1>{room.name}</h1><p>Service apartment in Jahi, Abuja.</p></div></div>
      <section className="sec-pad">
        <div className="wrap detail-grid">
          <div className="pics">{room.images.map((im, i) => <div key={i}><Img img={im} priority={i === 0} /></div>)}</div>
          <div>
            <div className="price">{money(room.price)} <small>/ {room.priceUnit}</small></div>
            <p className="lead" style={{ maxWidth: 'none' }}>{room.description}</p>
            <ul className="pill-list" aria-label="Apartment amenities">{room.amenities.map((a) => { const I = icons[a]; return <li key={a}>{I && <I aria-hidden="true" />}{a}</li> })}</ul>
            <p style={{ color: 'var(--muted)', fontSize: '.92rem' }}>All apartments are ensuite.</p>
            {room.capacity.confirmed && <p style={{ display: 'flex', gap: 8, marginTop: 10 }}><Users size={18} aria-hidden="true" />Up to {room.capacity.max} guests</p>}
            <div className="cta-row" style={{ marginTop: 26 }}>
              <Link to={`/book?room=${room.id}`} className="btn btn-primary">Book This Apartment</Link>
              <WhatsAppButton message={roomMsg(room)}>Ask on WhatsApp</WhatsAppButton>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
