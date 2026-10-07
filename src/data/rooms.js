import room1 from '../assets/room1.jpg'
import room2 from '../assets/room2.jpg'
import room3 from '../assets/room3.jpg'
import parlor from '../assets/parlor.jpg'
import dining from '../assets/dining.jpg'
import toilet from '../assets/IMG-20261006-WA0106.jpg'

// Central room data. Add availability by adding
// blockedRanges ({from:'YYYY-MM-DD', to:'YYYY-MM-DD'}) or replacing it with a backend call.
const img = (src, alt) => ({ src, alt, label: alt })
const features = ['Walk-in closet', 'TV', 'Balcony', 'Toilet', 'Bathroom', 'Ensuite']

// The first image is the main photo for each apartment (room1, room2, room3).
// The rest are shared photos from the estate.
const make = (n, price, max, mainPhoto) => ({
  id: `${n}-bedroom`,
  name: `${n} Bedroom Apartment`,
  type: `${n} Bedroom`,
  bedrooms: n,
  price,
  priceUnit: 'night', // assumption: nightly rate, confirm with the hotel
  description: `A comfortable ${n} bedroom ensuite serviced apartment in Jahi, Abuja, with a balcony and walk-in closet, suited to short and long stays.`,
  amenities: features,
  ensuite: true,
  balcony: true,
  walkInCloset: true,
  images: [
    img(mainPhoto, `${n} bedroom apartment bedroom`),
    img(parlor, `${n} bedroom apartment living area`),
    img(dining, 'Dining area'),
    img(toilet, 'Ensuite bathroom'),
  ],
  capacity: { max, confirmed: false }, // placeholder: set real guest limits, then confirmed:true to display them
  availability: { mode: 'manual-whatsapp', blockedRanges: [] },
})

export const rooms = [make(1, 75000, 2, room1), make(2, 130000, 4, room2), make(3, 220000, 6, room3)]
export const getRoom = (id) => rooms.find((r) => r.id === id)
