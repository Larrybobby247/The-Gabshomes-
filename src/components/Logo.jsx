import logo from '../assets/gabs_logo.png'

export default function Logo() {
  return (
    <>
      {/* <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" aria-hidden="true"><path d="M4 16 16 5l12 11M8 14v12h16V14"/></svg> */}
      <img src={logo} alt="Gabshomes logo" className='logo' />
      <span className="lname"><span className="lfull">The Gabshomes Limited</span><span className="lshort">The Gabshomes</span></span>
    </>
  )
}
