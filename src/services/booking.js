// Seam for a future backend. Today availability is NOT verified live: the hotel confirms it on WhatsApp.
import { nightsBetween } from '../utils/dates'
export function checkAvailability(room, checkIn, checkOut) {
  const clash = room.availability.blockedRanges.some((r) => checkIn < r.to && checkOut > r.from)
  return { status: clash ? 'blocked' : 'unverified', verifiedLive: false }
  // Later: return fetch(`/api/availability?room=${room.id}&from=${checkIn}&to=${checkOut}`).then((r) => r.json())
}
export const quote = (room, checkIn, checkOut) => {
  const nights = nightsBetween(checkIn, checkOut)
  return { nights, total: nights > 0 ? nights * room.price : 0 }
}
export function validate(f, room) {
  const e = {}
  if (!f.name.trim()) e.name = 'Enter your full name.'
  if (!/^\+?[0-9\s-]{10,16}$/.test(f.phone.trim())) e.phone = 'Enter a valid phone number.'
  if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) e.email = 'Enter a valid email address.'
  if (!f.checkIn) e.checkIn = 'Choose a check-in date.'
  if (!f.checkOut) e.checkOut = 'Choose a check-out date.'
  else if (f.checkIn && f.checkOut <= f.checkIn) e.checkOut = 'Check-out must be after check-in.'
  const g = Number(f.guests)
  if (!g || g < 1) e.guests = 'Enter the number of guests.'
  else if (g > room.capacity.max) e.guests = `This apartment is set up for up to ${room.capacity.max} guests.`
  if (!e.checkIn && !e.checkOut && checkAvailability(room, f.checkIn, f.checkOut).status === 'blocked') e.checkOut = 'Those dates are not available. Choose other dates.'
  return e
}
