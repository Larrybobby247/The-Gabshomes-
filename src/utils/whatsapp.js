import { SITE } from '../config'
export const waLink = (text) => `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`
export const money = (n) => `${SITE.currency}${Number(n).toLocaleString('en-NG')}`
export const generalMsg = () => 'Hello The Gabshomes, I would like to make an enquiry about your apartments.'
export const roomMsg = (room) =>
  `Hello The Gabshomes, I am interested in the ${room.type} apartment at ${money(room.price)}. Please provide more information.`
export const servicesMsg = (what) => `Hello The Gabshomes, I would like to enquire about your ${what} services.`
export const bookingMsg = ({ f, room, nights, total }) =>
  [
    'Hello The Gabshomes, I would like to make a booking.',
    '',
    `Name: ${f.name}`,
    `Room Type: ${room.type}`,
    `Check-in: ${f.checkIn}`,
    `Check-out: ${f.checkOut}`,
    `Guests: ${f.guests}`,
    `Phone: ${f.phone}`,
    `Email: ${f.email}`,
    `Estimated stay: ${nights} night${nights > 1 ? 's' : ''} (${money(total)}, excluding caution fee)`,
    f.message ? `Request: ${f.message}` : null,
    '',
    'Please confirm availability and provide the payment details.',
  ].filter((l) => l !== null).join('\n')
