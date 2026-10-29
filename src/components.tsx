import { useEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'

const MotionDiv = motion.create('div')

export function FadeIn({ children, delay = 0, duration = 0.7, x = 0, y = 30, className = '' }: {
  children: ReactNode; delay?: number; duration?: number; x?: number; y?: number; className?: string
}) {
  const reduced = useReducedMotion()
  return <MotionDiv className={className} initial={{ opacity: reduced ? 1 : 0, x: reduced ? 0 : x, y: reduced ? 0 : y }}
    whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true, margin: '50px', amount: 0 }}
    transition={{ duration: reduced ? 0 : duration, delay: reduced ? 0 : delay, ease: [0.25, 0.1, 0.25, 1] }}>
    {children}
  </MotionDiv>
}

export function ContactButton({ onClick, className = '' }: { onClick: () => void; className?: string }) {
  return <button onClick={onClick} className={`contact-button group ${className}`}>
    <span>Contact Me</span><ArrowUpRight size={18} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
  </button>
}

export function Magnet({ children, padding = 150, strength = 3, activeTransition = 'transform 0.3s ease-out', inactiveTransition = 'transform 0.6s ease-in-out' }: {
  children: ReactNode; padding?: number; strength?: number; activeTransition?: string; inactiveTransition?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [position, setPosition] = useState({ x: 0, y: 0, active: false })
  useEffect(() => {
    if (reduced || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const move = (event: PointerEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      // The untransformed wrapper keeps the attraction center stable.
      const x = event.clientX - rect.left - rect.width / 2
      const y = event.clientY - rect.top - rect.height / 2
      const active = Math.abs(x) < rect.width / 2 + padding && Math.abs(y) < rect.height / 2 + padding
      setPosition({ x: active ? x / strength : 0, y: active ? y / strength : 0, active })
    }
    const reset = () => setPosition({ x: 0, y: 0, active: false })
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', reset)
    return () => { window.removeEventListener('pointermove', move); document.removeEventListener('pointerleave', reset) }
  }, [padding, strength, reduced])
  return <div ref={ref}><div style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)`, transition: position.active ? activeTransition : inactiveTransition, willChange: 'transform' }}>{children}</div></div>
}

function Character({ character, progress, start, end }: { character: string; progress: MotionValue<number>; start: number; end: number }) {
  const opacity = useTransform(progress, [start, end], [0, 1])
  return <span className="relative"><span className="opacity-20">{character}</span><motion.span className="absolute left-0 top-0" style={{ opacity }}>{character}</motion.span></span>
}

export function AnimatedText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] })
  let characterIndex = 0
  return <p ref={ref} className="about-copy" aria-label={text}>
    {reduced ? text : <span aria-hidden="true">{text.split(' ').map((word, wordIndex) => {
      const startIndex = characterIndex
      characterIndex += word.length + 1
      return <span key={wordIndex} className="inline-block">{[...word].map((character, index) => <Character key={index} character={character} progress={scrollYProgress} start={(startIndex + index) / text.length} end={Math.min((startIndex + index + 8) / text.length, 1)} />)}{wordIndex < text.split(' ').length - 1 && '\u00a0'}</span>
    })}</span>}
  </p>
}

export function Modal({ title, onClose, children, wide = false }: { title: string; onClose: () => void; children: ReactNode; wide?: boolean }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = ref.current
    const previousFocus = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    dialog?.showModal()
    document.body.style.overflow = 'hidden'
    return () => { dialog?.close(); document.body.style.overflow = previousOverflow; previousFocus?.focus() }
  }, [])
  return createPortal(<dialog ref={ref} aria-label={title} className={`modal ${wide ? 'modal-wide' : ''}`}
    onCancel={(event) => { event.preventDefault(); onClose() }}
    onClick={(event) => { if (event.target === ref.current) { const rect = ref.current.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose() } }}>
    <div className="flex items-center justify-between gap-4 border-b border-white/15 pb-5 mb-7">
      <span className="text-xs tracking-[0.2em] uppercase text-mist/60">{title}</span>
      <button className="icon-button" aria-label="Close dialog" onClick={onClose}><X size={22} /></button>
    </div>
    {children}
  </dialog>, document.body)
}
