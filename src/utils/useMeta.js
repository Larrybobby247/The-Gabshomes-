import { useEffect } from 'react'
export default function useMeta(title, description) {
  useEffect(() => {
    document.title = title
    const set = (sel, attr, val) => { const el = document.querySelector(sel); if (el) el.setAttribute(attr, val) }
    set('meta[name="description"]', 'content', description)
    set('meta[property="og:title"]', 'content', title)
    set('meta[property="og:description"]', 'content', description)
  }, [title, description])
}
