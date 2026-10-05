import { Wifi, Tv, Clapperboard, Zap, Droplets, Sparkles, ShieldCheck, CircleDot, Sunset, Trees } from 'lucide-react'
import { FaDribbble } from 'react-icons/fa'
export const amenities = [
  { id: 'internet', label: 'High-speed Internet', icon: Wifi, text: 'Stay connected for work and streaming.' },
  { id: 'dstv', label: 'DStv', icon: Tv, text: 'Satellite TV in your apartment.' },
  { id: 'netflix', label: 'Netflix', icon: Clapperboard, text: 'Stream your own shows and films.' },
  { id: 'power', label: 'Backup power', icon: Zap, text: 'Reliable backup power supply.' },
  { id: 'toiletries', label: 'Toiletries', icon: Droplets, text: 'Toiletries provided.' },
  { id: 'housekeeping', label: 'Housekeeping', icon: Sparkles, text: 'Cleaning and housekeeping services.' },
  { id: 'gated', label: 'Gated estate', icon: ShieldCheck, text: 'Located within a gated estate.' },
  { id: 'snooker', label: 'Snooker', icon: CircleDot, text: 'Snooker on site.' },
  { id: 'basketball', label: 'Basketball court', icon: FaDribbble, text: 'A basketball court for guests.' },
  { id: 'balcony', label: 'Balcony', icon: Sunset, text: 'Balcony with your apartment.' },
  { id: 'serene', label: 'Serene environment', icon: Trees, text: 'A calm place to rest.' },
]
