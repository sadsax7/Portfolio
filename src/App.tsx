import { useEffect, useRef, useState, type FormEvent } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { ArrowUp, ArrowUpRight, Check, Copy } from 'lucide-react'
import { AnimatedText, ContactButton, FadeIn, Magnet, Modal } from './components'
import { decorations, marqueeImages, projects, services, type Project } from './data'

function HeroSection({ onContact }: { onContact: () => void }) {
  return <section className="hero relative flex h-screen flex-col" aria-label="Introduction">
    <FadeIn delay={0} y={-20} className="relative z-20">
      <nav aria-label="Main navigation" className="flex justify-between px-6 pt-6 md:px-10 md:pt-8">
        {[['About', '#about'], ['Price', '#services'], ['Projects', '#projects']].map(([label, href]) => <a key={label} href={href} className="nav-link">{label}</a>)}
        <button onClick={onContact} className="nav-link">Contact</button>
      </nav>
    </FadeIn>
    <div className="mt-6 overflow-hidden sm:mt-4 md:-mt-5">
      <FadeIn delay={0.15} y={40}><h1 className="hero-heading hero-title">Hi, i&apos;m alejo</h1></FadeIn>
    </div>
    <div className="portrait absolute left-1/2 z-10 -translate-x-1/2">
      <FadeIn delay={0.6} y={30}><Magnet><div className="hero-portrait-frame"><img src="/images/alejo-caricatura-transparent.png" alt="3D caricature portrait of Alejo with curly dark hair and silver earrings" className="hero-portrait-image" width="1254" height="1254" draggable={false} /></div></Magnet></FadeIn>
    </div>
    <div className="hero-bottom relative z-20 mt-auto flex items-end justify-between gap-5 px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
      <FadeIn delay={0.35} y={20}><p className="hero-intro max-w-[160px] font-light uppercase leading-snug tracking-wide sm:max-w-[220px] md:max-w-[260px]">A software engineer turning bold ideas into powerful digital experiences.</p></FadeIn>
      <FadeIn delay={0.5} y={20}><ContactButton onClick={onContact} /></FadeIn>
    </div>
  </section>
}

function MarqueeSection() {
  const ref = useRef<HTMLElement>(null)
  const rowOne = useRef<HTMLDivElement>(null)
  const rowTwo = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      if (!ref.current || !rowOne.current || !rowTwo.current) return
      const offset = reduced ? 200 : (window.innerHeight - ref.current.getBoundingClientRect().top) * 0.3
      const groupWidth = 11 * 432
      const normalized = ((offset - 200) % groupWidth + groupWidth) % groupWidth
      rowOne.current.style.transform = `translate3d(${-groupWidth + normalized}px,0,0)`
      rowTwo.current.style.transform = `translate3d(${-((offset - 200) % (10 * 432) + 10 * 432) % (10 * 432)}px,0,0)`
    }
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(frame) }
  }, [reduced])
  return <section ref={ref} id="work" aria-label="A selection of creative work" className="marquee-section overflow-hidden bg-ink pb-10 pt-24 sm:pt-32 md:pt-40">
    {[marqueeImages.slice(0, 11), marqueeImages.slice(11)].map((images, row) => <div className="marquee-row" ref={row === 0 ? rowOne : rowTwo} key={row}>
      {[...images, ...images, ...images].map(({ src, alt }, index) => <div className="marquee-tile" key={`${src}-${index}`} aria-hidden={index >= images.length ? true : undefined}>
        <img src={src} alt={index < images.length ? alt : ''} loading="lazy" decoding="async" width="420" height="270" />
      </div>)}
    </div>)}
  </section>
}

const aboutText = "With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!"

function AboutSection({ onContact }: { onContact: () => void }) {
  return <section id="about" className="about-section relative flex min-h-screen items-center justify-center px-5 py-20 sm:px-8 md:px-10">
    {decorations.map(({ src, position, x, delay }) => <FadeIn key={position} className={`decoration ${position}`} delay={delay} x={x} y={0} duration={0.9}>
      <img src={src} alt="" loading="lazy" decoding="async" className="h-auto w-full" />
    </FadeIn>)}
    <div className="relative z-10 flex flex-col items-center text-center">
      <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn y={40}><h2 className="hero-heading section-heading">About me</h2></FadeIn>
        <AnimatedText text={aboutText} />
      </div>
      <FadeIn className="mt-16 sm:mt-20 md:mt-24"><ContactButton onClick={onContact} /></FadeIn>
    </div>
  </section>
}

function ServicesSection() {
  return <section id="services" className="services-section relative rounded-t-[40px] bg-white px-5 py-20 text-ink sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32">
    <FadeIn y={40}><h2 className="section-heading mb-16 text-center sm:mb-20 md:mb-28">Services</h2></FadeIn>
    <div className="mx-auto max-w-5xl">
      {services.map((service, index) => <FadeIn key={service.name} delay={index * 0.1}>
        <article className="service-item flex items-center gap-7 border-t border-ink/15 py-8 sm:gap-12 sm:py-10 md:gap-20 md:py-12">
          <span className="service-number" aria-hidden="true">0{index + 1}</span>
          <div><h3 className="service-name mb-2 font-medium uppercase">{service.name}</h3><p className="service-description max-w-2xl font-light leading-relaxed opacity-60">{service.description}</p></div>
        </article>
      </FadeIn>)}
      <p className="border-t border-ink/15 pb-12 pt-7 text-center text-sm font-light text-ink/60">Every project is different. <a href="#contact" className="font-normal text-ink underline decoration-ink/30 underline-offset-4">Let&apos;s find the right fit.</a></p>
    </div>
  </section>
}

function ProjectCard({ project, index, total, progress, onSelect }: { project: Project; index: number; total: number; progress: MotionValue<number>; onSelect: (project: Project) => void }) {
  const reduced = useReducedMotion()
  const scale = useTransform(progress, [index / total, 1], [1, reduced ? 1 : 1 - (total - 1 - index) * 0.03])
  return <div className="project-track" style={{ zIndex: index + 1, top: `calc(var(--card-top) + ${index * 28}px)` }}>
    <div className="project-sticky">
      <motion.article className="project-card" style={{ scale }}>
        <div className="project-header">
          <span className="project-number">0{index + 1}</span>
          <div className="project-title-block"><p className="mb-1 text-xs font-light uppercase tracking-[0.15em] text-mist/50">{project.category}</p><h3>{project.name}</h3></div>
          <button className="live-button group" onClick={() => onSelect(project)}>Live Project <ArrowUpRight size={17} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></button>
        </div>
        <div className="project-grid">
          <div className="project-image-stack">
            <img className="project-small-image" src={project.images[0]} alt={`${project.name} — visual identity study`} loading="lazy" decoding="async" />
            <img className="project-medium-image" src={project.images[1]} alt={`${project.name} — 3D design detail`} loading="lazy" decoding="async" />
          </div>
          <img className="project-tall-image" src={project.images[2]} alt={`${project.name} — main project artwork`} loading="lazy" decoding="async" />
        </div>
      </motion.article>
    </div>
  </div>
}

function ProjectsSection({ onSelect }: { onSelect: (project: Project) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  return <section id="projects" className="projects-section relative z-10 -mt-10 rounded-t-[40px] bg-ink px-5 pb-20 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-32">
    <FadeIn y={40}><h2 className="hero-heading section-heading mb-16 text-center sm:mb-20 md:mb-28">Project</h2></FadeIn>
    <div ref={ref} className="project-list relative mx-auto max-w-[1600px]">
      {projects.map((project, index) => <ProjectCard key={project.name} project={project} index={index} total={projects.length} progress={scrollYProgress} onSelect={onSelect} />)}
      <div className="h-[50vh]" aria-hidden="true" />
    </div>
  </section>
}

function ContactDialog({ onClose }: { onClose: () => void }) {
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)
  const [brief, setBrief] = useState('')
  const [service, setService] = useState('3D Modeling')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const inquiry = `Hi Alejo!\n\nI'm ${name} (${email}).\nI'm interested in ${service}.\n\n${brief}`
  const submit = async (event: FormEvent) => {
    event.preventDefault()
    try { await navigator.clipboard.writeText(inquiry); setCopied(true); setCopyError(false) } catch { setCopyError(true) }
  }
  return <Modal title="Start a conversation" onClose={onClose}>
    <h2 className="text-4xl font-semibold uppercase leading-none sm:text-5xl">Great things<br /><span className="hero-heading">start with a hello.</span></h2>
    <p className="mb-7 mt-5 font-light text-mist/60">Tell me what you have in mind. Create an inquiry to copy and share through your preferred contact channel.</p>
    <form onSubmit={submit} onChange={() => setCopied(false)} className="contact-form">
      <div className="grid gap-4 sm:grid-cols-2"><label>Your name<input required autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Alex Smith" /></label><label>Email address<input type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="alex@studio.com" /></label></div>
      <label>What are we creating?<select value={service} onChange={(event) => setService(event.target.value)}>{services.map(({ name: serviceName }) => <option key={serviceName}>{serviceName}</option>)}</select></label>
      <label>A little about your idea<textarea required rows={4} value={brief} onChange={(event) => setBrief(event.target.value)} placeholder="The idea, the ambition, the timeline…" /></label>
      <button type="submit" className="contact-button w-full justify-center">{copied ? <Check size={18} /> : <Copy size={17} />}{copied ? 'Inquiry copied' : 'Copy project inquiry'}</button>
      <p role="status" className="min-h-5 text-center text-xs text-mist/60">{copied ? 'Ready to paste and share. Your inquiry has not been sent.' : 'Your details stay in this browser. Nothing is submitted.'}</p>
      {copyError && <label>Copy your inquiry manually<textarea readOnly rows={6} value={inquiry} onFocus={(event) => event.target.select()} /></label>}
    </form>
  </Modal>
}

function App() {
  const [contactOpen, setContactOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  return <main className="overflow-x-clip bg-ink text-mist">
    <a href="#about" className="skip-link">Skip to content</a>
    <HeroSection onContact={() => setContactOpen(true)} />
    <MarqueeSection />
    <AboutSection onContact={() => setContactOpen(true)} />
    <ServicesSection />
    <ProjectsSection onSelect={setSelectedProject} />
    <footer id="contact" className="mx-5 border-t border-mist/20 py-12 sm:mx-8 md:mx-10 md:py-16">
      <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
        <div><p className="mb-4 text-xs font-light uppercase tracking-[0.2em] text-mist/50">Have a project in mind?</p><button onClick={() => setContactOpen(true)} className="footer-cta group">Let&apos;s make it happen. <ArrowUpRight className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></button></div>
        <a href="#" className="flex items-center gap-3 text-xs uppercase tracking-widest text-mist/60 transition-colors hover:text-mist">Back to top <ArrowUp size={16} /></a>
      </div>
      <div className="mt-12 flex items-center justify-between text-[10px] font-light uppercase tracking-[0.15em] text-mist/40"><span>© {new Date().getFullYear()} Alejo</span><span>Made with a different perspective.</span></div>
    </footer>
    {contactOpen && <ContactDialog onClose={() => setContactOpen(false)} />}
    {selectedProject && <Modal title="Project preview" wide onClose={() => setSelectedProject(null)}>
      <p className="mb-2 text-xs uppercase tracking-widest text-mist/50">{selectedProject.category} · {selectedProject.disciplines}</p>
      <h2 className="hero-heading text-4xl font-semibold uppercase sm:text-6xl">{selectedProject.name}</h2>
      <p className="mb-8 mt-4 max-w-xl font-light text-mist/70">{selectedProject.description}</p>
      <div className="grid gap-4">{selectedProject.images.map((src, index) => <img key={src} src={src} alt={`${selectedProject.name} — project image ${index + 1}`} className="w-full rounded-2xl" />)}</div>
    </Modal>}
  </main>
}

export default App
