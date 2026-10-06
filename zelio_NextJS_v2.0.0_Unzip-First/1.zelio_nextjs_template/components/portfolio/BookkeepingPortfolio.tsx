'use client'

import { useEffect, useRef, useState } from 'react'
import { credentials, experience, profile, projects, services, skills } from './content'

const Arrow = () => <span aria-hidden="true">↗</span>
const nav = [['about', 'About'], ['expertise', 'Expertise'], ['work', 'Work'], ['experience', 'Experience']] as const

function Character() {
  const stage = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(true)
  const [videoFailed, setVideoFailed] = useState(false)
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  const still = paused || reducedMotion
  useEffect(() => {
    if (!video.current) return
    if (still) video.current.pause()
    else video.current.play().catch(() => setVideoFailed(true))
  }, [still])
  useEffect(() => {
    const element = stage.current
    if (!element || still || !window.matchMedia('(pointer: fine)').matches) return
    let frame = 0
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const x = Math.max(-1, Math.min(1, (event.clientX / window.innerWidth - .5) * 2))
        const y = Math.max(-1, Math.min(1, (event.clientY / window.innerHeight - .5) * 2))
        element.style.setProperty('--look-x', `${x * 9}px`)
        element.style.setProperty('--look-y', `${y * 3}px`)
        element.style.setProperty('--lean', `${x * 1.2}deg`)
        element.style.setProperty('--head-angle', `${x * 3}deg`)
        element.style.setProperty('--head-x', `${x * 2}px`)
      })
    }
    const reset = () => {
      cancelAnimationFrame(frame)
      element.style.setProperty('--look-x', '0px')
      element.style.setProperty('--look-y', '0px')
      element.style.setProperty('--lean', '0deg')
      element.style.setProperty('--head-angle', '0deg')
      element.style.setProperty('--head-x', '0px')
    }
    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', reset)
    return () => { window.removeEventListener('pointermove', move); document.documentElement.removeEventListener('pointerleave', reset); reset() }
  }, [still])
  return <div className={`fp-character-wrap ${still ? 'is-still' : ''}`}>
    <div className="fp-character-shadow" />
    <div className="fp-character" ref={stage}>
      {profile.motionVideo && !videoFailed ? <video ref={video} className="fp-character-art" src={profile.motionVideo} poster={profile.portrait} muted loop playsInline preload="none" onError={() => setVideoFailed(true)} aria-label="Animated portrait of Taimoor in a charcoal suit" /> : <div className="fp-character-art fp-portrait-rig"><img className="fp-portrait-body" src={profile.portrait} alt="Taimoor's AI-created full-length portrait in a charcoal suit and burgundy tie" width="1024" height="1536" fetchPriority="high" /><img className="fp-portrait-head" src={profile.portrait} alt="" aria-hidden="true" width="1024" height="1536" /></div>}
    </div>
    <span className="fp-portrait-note">A little personality. A lot of precision.</span>
    {!reducedMotion && <button className="fp-motion" type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? '▶ Play motion' : 'Ⅱ Pause motion'}</button>}
  </div>
}

function WorkVisual({ kind }: { kind: string }) {
  return <div className={`fp-work-visual fp-${kind}`} aria-hidden="true">
    {kind === 'ledger' ? <div className="fp-mini-sheet"><div className="fp-mini-head"><span>PAYABLES REGISTER</span><span className="fp-mini-dot" /></div><div className="fp-sheet-columns"><span>Entity</span><span>Period</span><span>Status</span></div>{['Holding LLC', 'Property LLC', 'Servicing LLC'].map((v, i) => <div className="fp-sheet-row" key={v}><span>{v}</span><span>0{i + 1}</span><span>✓ Reconciled</span></div>)}<div className="fp-sheet-foot">One register. Fully connected.</div></div> : kind === 'chart' ? <div className="fp-mini-chart"><span className="fp-mini-head">RECEIVABLES OVERVIEW</span><strong>Clarity, at a glance.</strong><div className="fp-bars">{[40, 58, 49, 75, 65, 90, 79].map((n, i) => <span key={i} style={{ height: `${n}%` }} />)}</div><div className="fp-chart-labels"><span>Track</span><span>Review</span><span>Collect</span></div></div> : <div className="fp-mini-close"><span className="fp-close-check">✓</span><strong>All in order.</strong><span>Reconcile. Review. Close.</span><div><span>Bank accounts ✓</span><span>General ledger ✓</span><span>Month-end reports ✓</span></div></div>}
  </div>
}

export default function BookkeepingPortfolio() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selected, setSelected] = useState<(typeof projects)[number] | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => { if (selected) dialog.current?.showModal() }, [selected])
  return <div className="folio">
    <a className="fp-skip" href="#main">Skip to content</a>
    <header className="fp-header">
      <a href="#home" className="fp-brand" aria-label="Taimoor Ihsan home"><img src={profile.photo} alt="" width="38" height="38" /><span>Taimoor Ihsan<span className="fp-brand-sub">BOOKKEEPER & ACCOUNTANT</span></span></a>
      <button className="fp-menu-toggle" aria-expanded={menuOpen} aria-controls="portfolio-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Close −' : 'Menu +'}</button>
      <nav id="portfolio-nav" className={menuOpen ? 'is-open' : ''} aria-label="Main navigation">{nav.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}<a className="fp-nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>Let’s talk <Arrow /></a></nav>
    </header>
    <main id="main">
      <section className="fp-hero fp-shell" id="home" aria-labelledby="hero-title">
        <div className="fp-hero-top"><span className="fp-eyebrow">INDEPENDENT BOOKKEEPER · GLOBAL CLIENTS</span><span className="fp-availability"><i /> Open to new engagements</span></div>
        <div className="fp-hero-name" aria-hidden="true">TAIMOOR</div><Character />
        <div className="fp-hero-copy"><span className="fp-eyebrow">HELLO, I’M TAIMOOR.</span><h1 id="hero-title">Your books.<br />My <em>expertise.</em></h1><p>Clear records. Confident decisions.<br />Bookkeeping with a human touch.</p></div>
        <div className="fp-hero-aside"><span className="fp-hand-note">Behind every number,<br />there’s your business.</span><a className="fp-button" href="#work">Explore my work <Arrow /></a><span className="fp-small">US & Canada · Working remotely</span></div>
        <a className="fp-scroll" href="#about"><span>↓</span> SCROLL TO GET ACQUAINTED</a>
      </section>
      <div className="fp-proof-strip"><div className="fp-shell fp-proof-grid"><div><strong>5+</strong><span>Years of experience</span></div><div><strong>$5M+</strong><span>Receivables tracked</span></div><a href={profile.upwork} target="_blank" rel="noreferrer"><strong>100% <span className="fp-proof-star">✦</span></strong><span>Upwork Job Success <Arrow /></span></a><a href={profile.upwork} target="_blank" rel="noreferrer"><strong className="fp-talent"><span>✦</span> Rising Talent</strong><span>On Upwork <Arrow /></span></a></div></div>
      <section className="fp-shell fp-section fp-about" id="about" aria-labelledby="about-title">
        <div className="fp-about-copy"><span className="fp-eyebrow">01 / THE PERSON BEHIND THE NUMBERS</span><h2 id="about-title">Hi, I’m <em>Taimoor.</em></h2><p className="fp-intro">I turn complicated books into<br />a clearer picture of your business.</p><p>I’m a remote bookkeeper and financial reporting specialist working with US and Canadian businesses. From the first transaction to the final month-end report, I bring structure, care, and a close eye for detail.</p><p>My focus? Reliable records, smoother processes, and financial information you can actually use.</p><div className="fp-inline-links"><a href={profile.upwork} target="_blank" rel="noreferrer">Meet me on Upwork <Arrow /></a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow /></a></div></div>
        <div className="fp-id-card"><div className="fp-lanyard" /><div className="fp-card-slot" /><div className="fp-card-top"><span>YOUR BOOKKEEPING PARTNER</span><span>✦</span></div><img src={profile.photo} alt="Muhammad Taimoor Ihsan" width="120" height="130" loading="lazy" /><h3>Taimoor Ihsan</h3><p>Good with numbers.<br />Even better with the details.</p><div className="fp-card-tags"><span>Detail-oriented</span><span>Remote-ready</span></div><div className="fp-card-bottom"><span>PAKISTAN → WORLDWIDE</span><span>|||| ||| |||||</span></div></div>
        <div className="fp-about-note"><span className="fp-note-star">✳</span><p>Less time<br />on the books.<br /><em>More time<br />on your business.</em></p><span className="fp-small">That’s the idea.</span></div>
      </section>
      <section className="fp-expertise-bg" id="expertise" aria-labelledby="expertise-title"><div className="fp-shell fp-section"><div className="fp-section-heading"><div><span className="fp-eyebrow">02 / HOW I CAN HELP</span><h2 id="expertise-title">Making every<br />number <em>count.</em></h2></div><p>Practical accounting support.<br />From everyday details to the bigger picture.</p></div><div className="fp-services">{services.map((service, i) => <article key={service.name}><span className="fp-service-number">0{i + 1} <span>↗</span></span><span className="fp-eyebrow">{service.name}</span><h3>{service.title}</h3><p>{service.text}</p><div className="fp-tags">{service.tags.map(tag => <span key={tag}>{tag}</span>)}</div></article>)}</div><div className="fp-toolbox"><span className="fp-eyebrow">MY EVERYDAY TOOLKIT</span><div className="fp-skills">{skills.map((skill, i) => <div className={`fp-skill ${skill.tone}`} key={skill.symbol} title={`${skill.label} — ${skill.note}`}><span className="fp-atomic">{String(i + 1).padStart(2, '0')}</span><strong>{skill.symbol}</strong><span>{skill.label}</span><small>{skill.note}</small></div>)}</div></div></div></section>
      <section className="fp-shell fp-section" id="work" aria-labelledby="work-title"><div className="fp-section-heading"><div><span className="fp-eyebrow">03 / SELECTED ENGAGEMENTS</span><h2 id="work-title">A few things<br />I’ve <em>put in order.</em></h2></div><p>Real bookkeeping work.<br />Thoughtful systems behind the scenes.</p></div><div className="fp-projects">{projects.map(project => <button className="fp-project" key={project.id} onClick={() => setSelected(project)} aria-haspopup="dialog"><WorkVisual kind={project.visual} /><span className="fp-project-category">{project.category}</span><span className="fp-project-title">{project.title}<Arrow /></span><span className="fp-project-subtitle">{project.subtitle}</span></button>)}</div><p className="fp-work-note">Illustrative visuals. Client information stays confidential.</p></section>
      <section className="fp-shell fp-section fp-journey" id="experience" aria-labelledby="journey-title"><div><span className="fp-eyebrow">04 / THE JOURNEY SO FAR</span><h2 id="journey-title">Experience<br />that <em>adds up.</em></h2><p className="fp-journey-intro">Hands-on work across real estate, loan servicing, and business bookkeeping.</p><div className="fp-credentials"><h3>Always learning.</h3>{credentials.map(item => <div key={item.title}><span aria-hidden="true">↗</span><div><h4>{item.title}</h4><p>{item.source}</p></div></div>)}</div></div><div className="fp-timeline">{experience.map((item, i) => <article key={item.company}><span className="fp-eyebrow">{item.date}</span>{i === 0 && <span className="fp-current">CURRENT</span>}<h3>{item.role}</h3><p>{item.company}</p><span className="fp-small">{item.location}</span><p className="fp-role-detail">{item.detail}</p></article>)}<p className="fp-small fp-concurrent">Overlapping dates reflect concurrent independent client engagements.</p></div></section>
      <section className="fp-contact" id="contact" aria-labelledby="contact-title"><div className="fp-shell"><div className="fp-contact-top"><span className="fp-eyebrow">05 / YOUR NEXT CHAPTER</span><span className="fp-availability"><i /> Let’s work together</span></div><div className="fp-contact-main"><h2 id="contact-title">Good books.<br /><em>Better possibilities.</em></h2><div><p>Need a fresh start with your finances,<br />or a steady pair of hands?</p><a className="fp-button fp-button-light" href={`mailto:${profile.email}`}>Let’s talk about your books <Arrow /></a><a className="fp-email" href={`mailto:${profile.email}`}>{profile.email}</a></div></div><footer><span>© {new Date().getFullYear()} Muhammad Taimoor Ihsan</span><div><a href={profile.upwork} target="_blank" rel="noreferrer">Upwork <Arrow /></a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow /></a><a href="#home">Back to top ↑</a></div></footer></div></section>
    </main>
    <dialog className="fp-dialog" ref={dialog} onClose={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close() }} aria-labelledby="project-title">
      {selected && <><button className="fp-dialog-close" onClick={() => dialog.current?.close()} aria-label="Close project details">×</button><span className="fp-eyebrow">{selected.category}</span><h2 id="project-title">{selected.subtitle}</h2><p>{selected.text}</p><h3>The work</h3><ul>{selected.points.map(point => <li key={point}>{point}</li>)}</ul><p className="fp-dialog-tools">{selected.tools}</p><a className="fp-button" href={`mailto:${profile.email}`}>Discuss a similar project <Arrow /></a></>}
    </dialog>
  </div>
}
