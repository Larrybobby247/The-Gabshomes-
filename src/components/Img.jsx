import { Image } from 'lucide-react'
// Shows a real photo when `img.src` exists, otherwise a clean placeholder.
export default function Img({ img, priority = false }) {
  if (img?.src) return <img src={img.src} alt={img.alt} loading={priority ? 'eager' : 'lazy'} decoding="async" />
  return <div className="ph" role="img" aria-label={img?.alt || 'Photo coming soon'}><Image aria-hidden="true" /><span>{img?.label || 'Photo coming soon'}</span></div>
}
