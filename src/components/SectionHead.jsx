export default function SectionHead({ eyebrow, title, lead }) {
  return <div className="head"><div className="eyebrow">{eyebrow}</div><h2>{title}</h2>{lead && <p className="lead">{lead}</p>}</div>
}
