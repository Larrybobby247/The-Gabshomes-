import { MessageCircle } from 'lucide-react'
import { waLink } from '../utils/whatsapp'
export default function WhatsAppButton({ message, children = 'Chat on WhatsApp', className = '' }) {
  return <a href={waLink(message)} target="_blank" rel="noopener noreferrer" className={`btn wa ${className}`}><MessageCircle size={20} aria-hidden="true" />{children}</a>
}
