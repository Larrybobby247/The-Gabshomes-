import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Info, AlertTriangle, Send, Pencil } from 'lucide-react'
import useMeta from '../utils/useMeta'
import BookingSteps from '../components/BookingSteps'
import { rooms, getRoom } from '../data/rooms'
import { BOOKING_NOTICE, CAUTION_NOTICE, PAYMENT_NOTICE } from '../config'
import { checkAvailability, quote, validate } from '../services/booking'
import { todayISO, addDays, prettyDate } from '../utils/dates'
import { money, waLink, bookingMsg } from '../utils/whatsapp'

function Field({ id, label, error, children }) {
  return <div className="field"><label htmlFor={id}>{label}</label>{children}{error && <p className="err" id={`${id}-e`} role="alert">{error}</p>}</div>
}
export default function Booking() {
  useMeta('Book a Stay | The Gabshomes, Jahi, Abuja', 'Request a shortlet apartment in Jahi, Abuja. Choose your dates, then confirm availability with The Gabshomes on WhatsApp.')
  const [p] = useSearchParams()
  const [f, setF] = useState({ roomId: getRoom(p.get('room'))?.id || rooms[0].id, checkIn: p.get('checkIn') || '', checkOut: p.get('checkOut') || '', guests: 2, name: '', phone: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [review, setReview] = useState(false)
  const room = getRoom(f.roomId)
  const { nights, total } = quote(room, f.checkIn, f.checkOut)
  const blocked = nights > 0 && checkAvailability(room, f.checkIn, f.checkOut).status === 'blocked'
  const set = (k) => (e) => { const v = e.target.value; setF((s) => { const n = { ...s, [k]: v }; if (k === 'checkIn' && n.checkOut && n.checkOut <= v) n.checkOut = ''; if (k === 'roomId') n.guests = Math.min(Number(n.guests) || 1, getRoom(v).capacity.max); return n }) }
  const bad = (k) => (errors[k] ? { className: 'bad', 'aria-invalid': true, 'aria-describedby': `${k}-e` } : {})
  const submit = (e) => { e.preventDefault(); const er = validate(f, room); setErrors(er); if (!Object.keys(er).length) { setReview(true); window.scrollTo({ top: 0, behavior: 'smooth' }) } }

  return (
    <>
      <div className="page-hero"><div className="wrap"><div className="eyebrow">Book a stay</div><h1>Request your apartment</h1><p>Send a booking request, then confirm availability with us on WhatsApp.</p></div></div>
      <section className="sec-pad">
        <div className="wrap book-layout">
          {!review ? (
            <form className="card" onSubmit={submit} noValidate>
              <div className="form-grid">
                <div className="full"><Field id="roomId" label="Apartment"><select id="roomId" value={f.roomId} onChange={set('roomId')}>{rooms.map((r) => <option key={r.id} value={r.id}>{r.name} · {money(r.price)}/night</option>)}</select></Field></div>
                <Field id="checkIn" label="Check-in" error={errors.checkIn}><input id="checkIn" type="date" min={todayISO()} value={f.checkIn} onChange={set('checkIn')} {...bad('checkIn')} /></Field>
                <Field id="checkOut" label="Check-out" error={errors.checkOut}><input id="checkOut" type="date" min={f.checkIn ? addDays(f.checkIn, 1) : addDays(todayISO(), 1)} value={f.checkOut} onChange={set('checkOut')} {...bad('checkOut')} /></Field>
                <div className="full"><Field id="guests" label="Number of guests" error={errors.guests}><input id="guests" type="number" min="1" max={room.capacity.max} inputMode="numeric" value={f.guests} onChange={set('guests')} {...bad('guests')} /></Field></div>
                <div className="full">{blocked
                  ? <div className="notice warn"><AlertTriangle aria-hidden="true" /><span>Those dates are marked unavailable. Please choose other dates.</span></div>
                  : <div className="notice"><Info aria-hidden="true" /><span>{nights > 0 ? `${nights} night${nights > 1 ? 's' : ''}: ${money(total)} estimated. ` : ''}Availability is not checked automatically. We confirm it with you on WhatsApp.</span></div>}</div>
                <Field id="name" label="Full name" error={errors.name}><input id="name" autoComplete="name" value={f.name} onChange={set('name')} {...bad('name')} /></Field>
                <Field id="phone" label="Phone number" error={errors.phone}><input id="phone" type="tel" autoComplete="tel" value={f.phone} onChange={set('phone')} {...bad('phone')} /></Field>
                <div className="full"><Field id="email" label="Email address" error={errors.email}><input id="email" type="email" autoComplete="email" value={f.email} onChange={set('email')} {...bad('email')} /></Field></div>
                <div className="full"><Field id="message" label="Additional message or request (optional)"><textarea id="message" value={f.message} onChange={set('message')} /></Field></div>
                <div className="full"><button className="btn btn-primary" type="submit" style={{ width: '100%' }}>Review booking request</button></div>
              </div>
            </form>
          ) : (
            <div className="card sum" style={{ position: 'static' }}>
              <h2 style={{ fontSize: '2rem' }}>Review your request</h2>
              <dl>
                {[['Apartment', room.name], ['Price', `${money(room.price)} per night`], ['Check-in', prettyDate(f.checkIn)], ['Check-out', prettyDate(f.checkOut)], ['Nights', nights], ['Guests', f.guests], ['Name', f.name], ['Phone', f.phone], ['Email', f.email], ...(f.message ? [['Request', f.message]] : [])].map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
              </dl>
              <div>Estimated total <div className="total">{money(total)}</div></div>
              <div className="notice warn"><AlertTriangle aria-hidden="true" /><span>{CAUTION_NOTICE}</span></div>
              <div className="notice"><Info aria-hidden="true" /><span>{BOOKING_NOTICE}</span></div>
              <a className="btn wa" href={waLink(bookingMsg({ f, room, nights, total }))} target="_blank" rel="noopener noreferrer"><Send size={18} aria-hidden="true" />Continue to WhatsApp</a>
              <button className="btn btn-line" onClick={() => setReview(false)}><Pencil size={18} aria-hidden="true" />Edit details</button>
            </div>
          )}
          <aside className="sum" aria-label="Booking information">
            <div className="card"><h3 style={{ fontSize: '1.5rem', margin: 0 }}>{room.name}</h3><div className="price" style={{ margin: '10px 0' }}>{money(room.price)} <small>/ night</small></div><p style={{ marginBottom: 0 }}>Ensuite, with balcony and walk-in closet.</p></div>
            <div className="notice warn"><AlertTriangle aria-hidden="true" /><span>{CAUTION_NOTICE}</span></div>
            <div className="notice"><Info aria-hidden="true" /><span>{PAYMENT_NOTICE}</span></div>
            <div className="notice"><Info aria-hidden="true" /><span>{BOOKING_NOTICE}</span></div>
          </aside>
        </div>
      </section>
      <section style={{ paddingTop: 0 }}><div className="wrap"><BookingSteps /></div></section>
    </>
  )
}
