import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'
const links = [['Home', '/'], ['Apartments', '/#apartments'], ['Amenities', '/#amenities'], ['Gallery', '/#gallery'], ['About', '/#about'], ['Contact', '/#contact']]
export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const loc = useLocation()
  useEffect(() => { const f = () => setScrolled(window.scrollY > 40); f(); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f) }, [])
  useEffect(() => setOpen(false), [loc])
  return (
    <nav className={scrolled ? 'scrolled' : ''} aria-label="Main">
      <div className="nav-in">
        <Link to="/" className="logo" aria-label="The Gabshomes home"><Logo /></Link>
        <div className={`links ${open ? 'open' : ''}`} id="links">
          {links.map(([t, to]) => <Link key={t} to={to}>{t}</Link>)}
          <Link to="/book" className="btn btn-primary">Book Now</Link>
        </div>
        <button className="burger" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="links" onClick={() => setOpen(!open)}><span /></button>
      </div>
    </nav>
  )
}
