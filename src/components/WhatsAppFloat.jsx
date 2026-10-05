import { MessageCircle } from 'lucide-react'
import { waLink, generalMsg } from '../utils/whatsapp'
export default function WhatsAppFloat() {
  return <a className="wa-float" href={waLink(generalMsg())} target="_blank" rel="noopener noreferrer" aria-label="Chat with The Gabshomes on WhatsApp"><MessageCircle aria-hidden="true" /></a>
}
