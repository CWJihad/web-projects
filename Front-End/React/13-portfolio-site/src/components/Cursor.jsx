import { useEffect, useRef } from "react"

export default function Cursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const move = (e) => {
      cursor.style.left = e.clientX + "px"
      cursor.style.top = e.clientY + "px"
    }
    const hover = () => cursor.classList.add("hover")
    const unhover = () => cursor.classList.remove("hover")

    window.addEventListener("mousemove", move)
    document.querySelectorAll("a, button, [data-hover]").forEach(el => {
      el.addEventListener("mouseenter", hover)
      el.addEventListener("mouseleave", unhover)
    })

    return () => window.removeEventListener("mousemove", move)
  }, [])

  return <div className="cursor" ref={cursorRef} />
}
