'use client'

import { useEffect, useRef, useState } from 'react'
import { credentials, experience, profile, projects, services, skills, upwork, upworkReviews } from './content'

const Arrow = () => <span aria-hidden="true">↗</span>
const nav = [['about', 'About'], ['expertise', 'Expertise'], ['work', 'Work'], ['upwork', 'Upwork'], ['experience', 'Experience']] as const

function ProfileCard() {
  const [pinned, setPinned] = useState(false)
  const [hovered, setHovered] = useState(false)
  const flipped = pinned || hovered

  return <button
    type="button"
    className={`fp-id-card ${flipped ? 'is-flipped' : ''}`}
    aria-label="Flip Taimoor's ID card"
    aria-pressed={flipped}
    aria-describedby="fp-card-instructions"
    onPointerEnter={event => { if (event.pointerType === 'mouse') setHovered(true) }}
    onPointerLeave={() => setHovered(false)}
    onClick={() => { setPinned(!flipped); setHovered(false) }}
  >
    <span className="fp-lanyard" aria-hidden="true" />
    <span className="fp-card-flipper">
      <span className="fp-card-face fp-card-front" aria-hidden={flipped}>
        <span className="fp-card-slot" />
        <span className="fp-card-top"><span>YOUR BOOKKEEPING PARTNER</span><span>✦</span></span>
        <img src={profile.photo} alt="" width="120" height="130" loading="lazy" />
        <span className="fp-card-name">Taimoor Ihsan</span>
        <span className="fp-card-bio">Good with numbers.<br />Even better with the details.</span>
        <span className="fp-card-tags"><span>Detail-oriented</span><span>Remote-ready</span></span>
        <span className="fp-card-bottom"><span>PAKISTAN → WORLDWIDE</span><span>|||| ||| |||||</span></span>
      </span>
      <span className="fp-card-face fp-card-back" aria-hidden={!flipped}>
        <span className="fp-card-slot" />
        <span className="fp-card-top"><span>THE DETAILS THAT MATTER</span><span>✦</span></span>
        <span className="fp-card-name">Your books,<br /><em>in good hands.</em></span>
        <span className="fp-card-specialties"><span>01 · Bookkeeping & cleanup</span><span>02 · Accounts payable & receivable</span><span>03 · Reconciliation & reporting</span></span>
        <span className="fp-card-back-note">QuickBooks · Xero · Excel<br />US & Canadian clients · Remote</span>
        <span className="fp-card-email">{profile.email}</span>
        <span className="fp-card-bottom"><span>LET’S MAKE IT ADD UP.</span><span>↗</span></span>
      </span>
    </span>
    <span id="fp-card-instructions" className="fp-flip-hint">{flipped ? '↻ Tap to flip back' : '↻ Hover or tap to flip'}</span>
  </button>
}

function UpworkProfile() {
  return <section className="fp-shell fp-upwork" id="upwork" aria-labelledby="upwork-title">
    <div className="fp-upwork-heading"><div><span className="fp-eyebrow">MY FREELANCE HOME</span><h2 id="upwork-title">Find me on <em>Upwork.</em></h2></div><a className="fp-button" href={profile.upwork} target="_blank" rel="noreferrer">View my Upwork profile <Arrow /></a></div>
    <div className="fp-upwork-panel">
      <div className="fp-upwork-person"><img src={profile.photo} alt="Muhammad Taimoor Ihsan" width="70" height="70" loading="lazy" /><div><span className="fp-upwork-wordmark">upwork</span><h3>Muhammad Taimoor Ihsan</h3><p>{upwork.title}</p></div><div className="fp-upwork-rate"><strong>{upwork.hourlyRate}<small>/hr</small></strong><span>USD · Profile rate</span></div></div>
      <div className="fp-upwork-stats">
        <div><span className="fp-upwork-icon" aria-hidden="true">✦</span><strong>{upwork.jobSuccess}</strong><span>Job Success</span></div>
        <div><span className="fp-upwork-icon" aria-hidden="true">↗</span><strong className="fp-upwork-talent">{upwork.badge}</strong><span>Talent badge</span></div>
        <div><span className="fp-upwork-icon" aria-hidden="true">★</span><strong>{upwork.rating}<small>/5</small></strong><span>Client rating · {upwork.feedbackCount} feedback entries</span></div>
        <div><span className="fp-upwork-icon" aria-hidden="true">✓</span><strong>{upwork.completedJobs}</strong><span>Completed jobs</span></div>
        <div><span className="fp-upwork-icon" aria-hidden="true">$</span><strong>{upwork.earnings}</strong><span>Total earned on Upwork</span></div>
      </div>
      <div className="fp-upwork-skills">{upwork.skills.map(skill => <span key={skill}>{skill}</span>)}</div>
      <div className="fp-reviews-heading"><h3 id="upwork-reviews-title">What my clients say.</h3><span>Feedback from finance &amp; development engagements</span></div>
      <div className="fp-reviews" role="region" aria-labelledby="upwork-reviews-title" tabIndex={0}>
        {upworkReviews.map(review => <article className="fp-review" key={review.title}>
          <div className="fp-review-rating"><span aria-hidden="true">★★★★★</span><strong>{review.rating}<span className="fp-sr-only"> out of 5 stars</span></strong><span>Upwork client</span></div>
          <h4>{review.title}</h4><span className="fp-review-date">{review.date}</span>
          <blockquote><p>“{review.quote}”</p></blockquote>
          <div className="fp-review-tags">{review.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
          <a href={profile.upwork} target="_blank" rel="noreferrer">{review.excerpt ? 'Read full review' : 'View on Upwork'} <Arrow /></a>
        </article>)}
      </div>
      <div className="fp-upwork-footer"><span>Rate, earnings & job counts checked {upwork.checkedOn}.</span><a href={profile.upwork} target="_blank" rel="noreferrer">See current badges & client feedback <Arrow /></a></div>
    </div>
  </section>
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
        <div className="fp-hero-name" aria-hidden="true">TAIMOOR</div>
        <div className="fp-hero-copy"><span className="fp-eyebrow">HELLO, I’M TAIMOOR.</span><h1 id="hero-title">Your books.<br />My <em>expertise.</em></h1><p>Full-charge bookkeeping for US and Canadian businesses. I organize daily transactions, reconcile accounts, manage payables and receivables, and prepare clear month-end reports.</p></div>
        <aside className="fp-hero-aside fp-hero-details" aria-label="Bookkeeping support"><span className="fp-eyebrow">WHAT I BRING TO YOUR BOOKS</span><h2>Accurate records.<br /><em>A clearer picture.</em></h2><ul><li><strong>Keep the everyday organized</strong><span>Transaction coding, vendor bills, invoicing, and AP/AR tracking.</span></li><li><strong>Close with confidence</strong><span>Bank reconciliations, ledger reviews, and monthly financial statements.</span></li><li><strong>Get back on track</strong><span>Bookkeeping cleanup, catch-up, and practical reporting workflows.</span></li></ul><span className="fp-small">QuickBooks Online &amp; Desktop · Xero · Excel</span><a className="fp-button" href="#contact">Discuss your bookkeeping <Arrow /></a></aside>
        <a className="fp-scroll" href="#about"><span>↓</span> SCROLL TO GET ACQUAINTED</a>
      </section>
      <div className="fp-proof-strip"><div className="fp-shell fp-proof-grid"><div><strong>5+</strong><span>Years of experience</span></div><div><strong>$5M+</strong><span>Receivables tracked</span></div><a href={profile.upwork} target="_blank" rel="noreferrer"><strong>100% <span className="fp-proof-star">✦</span></strong><span>Upwork Job Success <Arrow /></span></a><a href={profile.upwork} target="_blank" rel="noreferrer"><strong className="fp-talent"><span>✦</span> Rising Talent</strong><span>On Upwork <Arrow /></span></a></div></div>
      <section className="fp-shell fp-section fp-about" id="about" aria-labelledby="about-title">
        <div className="fp-about-copy"><span className="fp-eyebrow">01 / THE PERSON BEHIND THE NUMBERS</span><h2 id="about-title">Hi, I’m <em>Taimoor.</em></h2><p className="fp-intro">I turn complicated books into<br />a clearer picture of your business.</p><p>I’m a remote bookkeeper and financial reporting specialist working with US and Canadian businesses. From the first transaction to the final month-end report, I bring structure, care, and a close eye for detail.</p><p>My focus? Reliable records, smoother processes, and financial information you can actually use.</p><div className="fp-inline-links"><a href={profile.upwork} target="_blank" rel="noreferrer">Meet me on Upwork <Arrow /></a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow /></a></div></div>
        <ProfileCard />
        <div className="fp-about-note"><span className="fp-note-star">✳</span><p>Less time<br />on the books.<br /><em>More time<br />on your business.</em></p><span className="fp-small">That’s the idea.</span></div>
      </section>
      <section className="fp-expertise-bg" id="expertise" aria-labelledby="expertise-title"><div className="fp-shell fp-section"><div className="fp-section-heading"><div><span className="fp-eyebrow">02 / HOW I CAN HELP</span><h2 id="expertise-title">Making every<br />number <em>count.</em></h2></div><p>Practical accounting support.<br />From everyday details to the bigger picture.</p></div><div className="fp-services">{services.map((service, i) => <article key={service.name}><span className="fp-service-number">0{i + 1} <span>↗</span></span><span className="fp-eyebrow">{service.name}</span><h3>{service.title}</h3><p>{service.text}</p><div className="fp-tags">{service.tags.map(tag => <span key={tag}>{tag}</span>)}</div></article>)}</div><div className="fp-toolbox"><span className="fp-eyebrow">MY EVERYDAY TOOLKIT</span><div className="fp-skills">{skills.map((skill, i) => <div className={`fp-skill ${skill.tone}`} key={skill.symbol} title={`${skill.label} — ${skill.note}`}><span className="fp-atomic">{String(i + 1).padStart(2, '0')}</span><strong>{skill.symbol}</strong><span>{skill.label}</span><small>{skill.note}</small></div>)}</div></div></div></section>
      <section className="fp-shell fp-section" id="work" aria-labelledby="work-title"><div className="fp-section-heading"><div><span className="fp-eyebrow">03 / SELECTED ENGAGEMENTS</span><h2 id="work-title">A few things<br />I’ve <em>put in order.</em></h2></div><p>Real bookkeeping work.<br />Thoughtful systems behind the scenes.</p></div><div className="fp-projects">{projects.map(project => <button className="fp-project" key={project.id} onClick={() => setSelected(project)} aria-haspopup="dialog"><WorkVisual kind={project.visual} /><span className="fp-project-category">{project.category}</span><span className="fp-project-title">{project.title}<Arrow /></span><span className="fp-project-subtitle">{project.subtitle}</span></button>)}</div><p className="fp-work-note">Illustrative visuals. Client information stays confidential.</p></section>
      <UpworkProfile />
      <section className="fp-shell fp-section fp-journey" id="experience" aria-labelledby="journey-title"><div><span className="fp-eyebrow">04 / THE JOURNEY SO FAR</span><h2 id="journey-title">Experience<br />that <em>adds up.</em></h2><p className="fp-journey-intro">Hands-on work across real estate, loan servicing, and business bookkeeping.</p><div className="fp-credentials"><h3>Always learning.</h3>{credentials.map(item => <div key={item.title}><span aria-hidden="true">↗</span><div><h4>{item.title}</h4><p>{item.source}</p></div></div>)}</div></div><div className="fp-timeline">{experience.map((item, i) => <article key={item.company}><span className="fp-eyebrow">{item.date}</span>{i === 0 && <span className="fp-current">CURRENT</span>}<h3>{item.role}</h3><p>{item.company}</p><span className="fp-small">{item.location}</span><p className="fp-role-detail">{item.detail}</p></article>)}<p className="fp-small fp-concurrent">Overlapping dates reflect concurrent independent client engagements.</p></div></section>
      <section className="fp-contact" id="contact" aria-labelledby="contact-title"><div className="fp-shell"><div className="fp-contact-top"><span className="fp-eyebrow">05 / YOUR NEXT CHAPTER</span><span className="fp-availability"><i /> Let’s work together</span></div><div className="fp-contact-main"><h2 id="contact-title">Good books.<br /><em>Better possibilities.</em></h2><div><p>Need a fresh start with your finances,<br />or a steady pair of hands?</p><a className="fp-button fp-button-light" href={`mailto:${profile.email}`}>Let’s talk about your books <Arrow /></a><a className="fp-email" href={`mailto:${profile.email}`}>{profile.email}</a></div></div><footer><span>© {new Date().getFullYear()} Muhammad Taimoor Ihsan</span><div><a href={profile.upwork} target="_blank" rel="noreferrer">Upwork <Arrow /></a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow /></a><a href="#home">Back to top ↑</a></div></footer></div></section>
    </main>
    <dialog className="fp-dialog" ref={dialog} onClose={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close() }} aria-labelledby="project-title">
      {selected && <><button className="fp-dialog-close" onClick={() => dialog.current?.close()} aria-label="Close project details">×</button><span className="fp-eyebrow">{selected.category}</span><h2 id="project-title">{selected.subtitle}</h2><p>{selected.text}</p><h3>The work</h3><ul>{selected.points.map(point => <li key={point}>{point}</li>)}</ul><p className="fp-dialog-tools">{selected.tools}</p><a className="fp-button" href={`mailto:${profile.email}`}>Discuss a similar project <Arrow /></a></>}
    </dialog>
  </div>
}
