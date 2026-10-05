import { Link } from 'react-router-dom'
import { Shirt, Sunset, Bath } from 'lucide-react'
import Img from './Img'
import { money } from '../utils/whatsapp'
export default function RoomCard({ room }) {
  return (
    <article className="room">
      <div className="pic"><Img img={room.images[0]} /><span className="tag">{room.type}</span></div>
      <div className="room-body">
        <h3>{room.name}</h3>
        <p>{room.description}</p>
        <div className="feats">
          <span><Bath aria-hidden="true" />Ensuite</span><span><Sunset aria-hidden="true" />Balcony</span><span><Shirt aria-hidden="true" />Walk-in closet</span>
        </div>
        <div className="room-foot">
          <div className="price">{money(room.price)} <small>/ {room.priceUnit}</small></div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Link to={`/apartments/${room.id}`} className="btn btn-line">Details</Link>
            <Link to={`/book?room=${room.id}`} className="btn btn-primary">Book</Link>
          </div>
        </div>
      </div>
    </article>
  )
}
