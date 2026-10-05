import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Phone,
  Paintbrush,
  Building2,
  Home as HomeIcon,
  CalendarCheck,
  Wallet,
} from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import Img from "../components/Img";
import SectionHead from "../components/SectionHead";
import RoomCard from "../components/RoomCard";
import BookingSteps from "../components/BookingSteps";
import WhatsAppButton from "../components/WhatsAppButton";
import useMeta from "../utils/useMeta";
import { rooms } from "../data/rooms";
import { amenities } from "../data/amenities";
import { gallery, galleryCategories } from "../data/gallery";
import { SITE } from "../config";
import { generalMsg, servicesMsg } from "../utils/whatsapp";
import { todayISO, addDays } from "../utils/dates";

// Images from src/assets
import parlor from "../assets/parlor.jpg";
import dining from "../assets/dining.jpg";
import amenitiesImg from "../assets/amenities.jpg";

function QuickBar() {
  const nav = useNavigate();
  const [q, setQ] = useState({ room: rooms[0].id, checkIn: "", checkOut: "" });
  const set = (k) => (e) =>
    setQ((p) => {
      const n = { ...p, [k]: e.target.value };
      if (k === "checkIn" && n.checkOut && n.checkOut <= n.checkIn)
        n.checkOut = "";
      return n;
    });
  const go = (e) => {
    e.preventDefault();
    nav(`/book?room=${q.room}&checkIn=${q.checkIn}&checkOut=${q.checkOut}`);
  };
  return (
    <form
      className="book book-bar"
      onSubmit={go}
      aria-label="Start a booking request"
    >
      <div>
        <label htmlFor="q-room">Apartment</label>
        <select id="q-room" value={q.room} onChange={set("room")}>
          {rooms.map((r) => (
            <option key={r.id} value={r.id}>
              {r.type}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="q-ci">Check-in</label>
        <input
          id="q-ci"
          type="date"
          min={todayISO()}
          value={q.checkIn}
          onChange={set("checkIn")}
        />
      </div>
      <div>
        <label htmlFor="q-co">Check-out</label>
        <input
          id="q-co"
          type="date"
          min={q.checkIn ? addDays(q.checkIn, 1) : addDays(todayISO(), 1)}
          value={q.checkOut}
          onChange={set("checkOut")}
        />
      </div>
      <button className="btn btn-primary" type="submit">
        Request a Stay
      </button>
    </form>
  );
}

function Gallery() {
  const [cat, setCat] = useState("All");
  const items =
    cat === "All" ? gallery : gallery.filter((g) => g.category === cat);
  const span = cat === "All" ? ["g1", "g2", "", "g4", "", "g6"] : [];
  return (
    <section id="gallery" aria-labelledby="gal-h">
      <div className="wrap">
        <SectionHead
          eyebrow="Gallery"
          title={<span id="gal-h">A look around</span>}
          lead="A few photos of our apartments and estate."
        />
        <div className="chips" role="group" aria-label="Filter photos">
          {galleryCategories.map((c) => (
            <button
              key={c}
              className="chip"
              aria-pressed={cat === c}
              onClick={() => setCat(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="gal">
          {items.map((g, i) => (
            <figure
              key={g.id}
              className={span.length ? span[i % span.length] : ""}
            >
              <Img img={g} />
              <figcaption>{g.category}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

const whyItems = [
  {
    Icon: HomeIcon,
    title: "Short or long stay",
    text: "Choose a few nights or a longer stay in the same ensuite apartment types.",
  },
  {
    Icon: CalendarCheck,
    title: "Confirmed with you directly",
    text: "We confirm availability with you on WhatsApp before any payment.",
  },
  {
    Icon: Wallet,
    title: "Straightforward payment",
    text: "Bank transfer once your dates are confirmed. No online payment on this site.",
  },
];

export default function Home() {
  useMeta(
    "The Gabshomes | Shortlet & Service Apartments in Jahi, Abuja",
    "Affordable luxury service apartments in Jahi, Abuja. Ensuite 1, 2 and 3 bedroom shortlet apartments for short and long stays. Request your stay and confirm on WhatsApp.",
  );
  return (
    <>
      <header className="hero" id="home">
        <div className="hero-bg">
          <Img
            img={{
              src: parlor,
              alt: "The Gabshomes service apartments, Jahi, Abuja",
            }}
          />
        </div>
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <div className="eyebrow">The Gabshomes Limited · Jahi, Abuja</div>
              <h1>Affordable luxury, made for your stay.</h1>
              <p>
                Ensuite service apartments in Jahi, Abuja, for short and long
                stays. Pick your dates, send a request and we confirm on
                WhatsApp.
              </p>
              <div className="cta-row">
                <Link to="/book" className="btn btn-primary">
                  Book a Stay
                </Link>
                <a href="#apartments" className="btn btn-ghost">
                  See Apartments
                </a>
              </div>
            </div>
            <div className="hero-img">
              <Img
                img={{
                  src: parlor,
                  alt: "Apartment interior at The Gabshomes",
                }}
                priority
              />
            </div>
          </div>
          <QuickBar />
        </div>
      </header>
      <div className="book-spacer" />

      <section className="intro" id="about" style={{ paddingTop: 110 }}>
        <div className="wrap intro-grid">
          <div className="collage">
            <div className="a">
              <Img
                img={{ src: dining, alt: "Dining area, Jahi shortlet apartment" }}
              />
            </div>
            <div className="b">
              <Img
                img={{ src: amenitiesImg, alt: "Estate amenities, Jahi" }}
              />
            </div>
            <div className="badge">
              Short &amp; long stays<small>Jahi, Abuja</small>
            </div>
          </div>
          <div>
            <div className="eyebrow">About The Gabshomes</div>
            <h2>Service apartments in Jahi, with room to settle in.</h2>
            <p className="lead">
              The Gabshomes Limited offers affordable luxury service apartments
              for short and long stays in Jahi, Abuja. Beyond accommodation, we
              also work in interior decoration and real estate development.
            </p>
            <div className="contact-pill">
              <div className="ic">
                <Phone aria-hidden="true" />
              </div>
              <div>
                <b>{SITE.phoneDisplay}</b>
                <span>Call or WhatsApp</span>
              </div>
              <WhatsAppButton message={generalMsg()}>Message us</WhatsAppButton>
            </div>
          </div>
        </div>
      </section>

      <section id="apartments" aria-labelledby="apt-h">
        <div className="wrap">
          <SectionHead
            eyebrow="Apartments"
            title={<span id="apt-h">Choose your apartment</span>}
            lead="Every apartment is ensuite, with a balcony and walk-in closet."
          />
          <div className="rooms">
            {rooms.map((r) => (
              <RoomCard key={r.id} room={r} />
            ))}
          </div>
        </div>
      </section>

      <section className="fac" id="amenities" aria-labelledby="am-h">
        <div className="wrap">
          <SectionHead
            eyebrow="Amenities"
            title={<span id="am-h">Everything you need on site</span>}
          />
          <div className="fac-grid">
            {amenities.map(({ id, label, icon: I, text }) => (
              <div className="fac-item" key={id}>
                <div className="ic">
                  <I aria-hidden="true" />
                </div>
                <h3>{label}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="why" aria-labelledby="why-h">
        <div className="wrap">
          <SectionHead
            eyebrow="Why The Gabshomes"
            title={<span id="why-h">Simple to book, easy to stay</span>}
          />
          <div className="why-grid">
            {whyItems.map(({ Icon, title, text }) => (
              <div className="card why-card" key={title}>
                <div className="ic">
                  <Icon aria-hidden="true" />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }} aria-labelledby="how-h">
        <div className="wrap">
          <SectionHead
            eyebrow="How booking works"
            title={
              <span id="how-h">From apartment to WhatsApp in a few steps</span>
            }
          />
          <BookingSteps />
        </div>
      </section>

      <Gallery />

      <section
        className="tests"
        id="services"
        aria-labelledby="svc-h"
        style={{ background: "var(--tint)" }}
      >
        <div className="wrap">
          <SectionHead
            eyebrow="More from The Gabshomes"
            title={<span id="svc-h">Interior decor &amp; real estate</span>}
            lead="Separate from apartment bookings: ask us about these directly on WhatsApp."
          />
          <div className="two">
            <div className="card">
              <div className="ic">
                <Paintbrush aria-hidden="true" />
              </div>
              <h3>Interior Decor</h3>
              <p>
                The Gabshomes is involved in interior decoration and design.
              </p>
              <WhatsAppButton message={servicesMsg("interior decor")}>
                Ask about interior decor
              </WhatsAppButton>
            </div>
            <div className="card">
              <div className="ic">
                <Building2 aria-hidden="true" />
              </div>
              <h3>Real Estate Development</h3>
              <p>The company is also involved in real estate development.</p>
              <WhatsAppButton message={servicesMsg("real estate development")}>
                Ask about real estate
              </WhatsAppButton>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" aria-labelledby="ct-h">
        <div className="wrap c-grid">
          <div>
            <div className="eyebrow">Contact</div>
            <h2 id="ct-h">Talk to The Gabshomes</h2>
            <div className="c-list">
              <div className="c-item">
                <div className="ic">
                  <HomeIcon aria-hidden="true" />
                </div>
                <div>
                  <b>{SITE.name}</b>
                  <span>{SITE.location}</span>
                </div>
              </div>
              <a className="c-item" href={`tel:${SITE.phoneTel}`}>
                <div className="ic">
                  <Phone aria-hidden="true" />
                </div>
                <div>
                  <b>Phone / WhatsApp</b>
                  <span>{SITE.phoneDisplay}</span>
                </div>
              </a>
              <a
                className="c-item"
                href={SITE.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="ic">
                  <FaInstagram aria-hidden="true" />
                </div>
                <div>
                  <b>Instagram</b>
                  <span>{SITE.instagramHandle}</span>
                </div>
              </a>
            </div>
          </div>
          <div className="deep-card">
            <h3>Ready to book?</h3>
            <p>
              Send your request and we confirm availability on WhatsApp. Payment
              is by bank transfer after that.
            </p>
            <div className="cta-row">
              <Link to="/book" className="btn btn-primary">
                Book a Stay
              </Link>
              <WhatsAppButton message={generalMsg()}>
                WhatsApp us
              </WhatsAppButton>
            </div>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }} aria-labelledby="ig-h">
        <div className="wrap" style={{ textAlign: "center" }}>
          <SectionHead
            eyebrow="Instagram"
            title={<span id="ig-h">Follow @the_gabshomes</span>}
          />
          <a
            className="btn btn-line"
            href={SITE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={20} aria-hidden="true" />
            Open Instagram
          </a>
        </div>
      </section>
    </>
  );
}