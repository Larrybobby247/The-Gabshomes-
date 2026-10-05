const steps = [
  ['Choose an apartment', 'Pick a room type and your dates.'],
  ['Send your request', 'Fill in your details and review the summary.'],
  ['Continue on WhatsApp', 'Your request opens pre-filled in WhatsApp.'],
  ['We confirm availability', 'The Gabshomes replies to confirm your dates.'],
  ['Pay by bank transfer', 'Bank details are shared after availability is confirmed.'],
]
export default function BookingSteps() {
  return <ol className="steps">{steps.map(([t, d]) => <li className="step" key={t}><b>{t}</b>{d}</li>)}</ol>
}
