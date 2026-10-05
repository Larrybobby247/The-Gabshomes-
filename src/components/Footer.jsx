import { Link } from 'react-router-dom'
import { Phone, MapPin } from 'lucide-react'
import { FaInstagram } from 'react-icons/fa'
import Logo from './Logo'
import WhatsAppButton from './WhatsAppButton'
import { SITE } from '../config'
import { generalMsg } from '../utils/whatsapp'

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="f-grid">

          <div>
            <div className="logo">
              <Logo />
            </div>

            <p>
              Affordable luxury service apartments for short and long stays
              in Jahi, Abuja. We also do interior decoration and real estate
              development.
            </p>

            <div className="soc">
              <a
                href={SITE.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="The Gabshomes on Instagram"
              >
                <FaInstagram color="#fff" size={19} />
              </a>
            </div>
          </div>

          <div>
            <h4>Explore</h4>

            <ul>
              {[
                ['Apartments', '/#apartments'],
                ['Amenities', '/#amenities'],
                ['Gallery', '/#gallery'],
                ['About', '/#about'],
                ['Contact', '/#contact'],
                ['Book a stay', '/book'],
              ].map(([t, to]) => (
                <li key={t}>
                  <Link to={to}>{t}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Contact</h4>

            <ul>
              <li style={{ display: 'flex', gap: 8 }}>
                <MapPin size={18} aria-hidden="true" />
                {SITE.location}
              </li>

              <li>
                <a
                  href={`tel:${SITE.phoneTel}`}
                  style={{ display: 'flex', gap: 8 }}
                >
                  <Phone size={18} aria-hidden="true" />
                  {SITE.phoneDisplay}
                </a>
              </li>

              <li>
                <a
                  href={SITE.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram: {SITE.instagramHandle}
                </a>
              </li>
            </ul>

            <div
              style={{
                marginTop: 18,
                display: 'flex',
                gap: 10,
                flexWrap: 'wrap',
              }}
            >
              <Link to="/book" className="btn btn-primary">
                Book a Stay
              </Link>

              <WhatsAppButton message={generalMsg()}>
                WhatsApp
              </WhatsAppButton>
            </div>
          </div>

        </div>

        <div className="copy">
          <span>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </span>

          <span>Jahi, Abuja</span>
        </div>
      </div>
    </footer>
  )
}