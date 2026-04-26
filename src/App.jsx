import { useState, useEffect, useRef } from 'react'
import profilePic from './image/photo_cv.png'

const NAV = ['Accueil', 'À propos', 'Compétences', 'Projets', 'Parcours', 'Contact']

const SKILLS = [
  { cat: 'Frontend', items: ['React JS', 'Vue.js', 'HTML & CSS', 'JavaScript', 'Tailwind CSS', 'Flutter', 'Dart'] },
  { cat: 'Backend', items: ['Java Spring Boot', 'Node JS', 'Express.js', 'PHP', 'Grails', 'Python'] },
  { cat: 'Bases de données', items: ['MySQL', 'PostgreSQL', 'MariaDB', 'DBeaver', 'SQL Developer'] },
  { cat: 'Outils', items: ['Git & GitHub', 'UML', 'Power BI', 'Word', 'Excel', 'PowerPoint'] },
]

const ProjectCard = ({ p }) => {
  const videoRef = useRef(null)
  return (
    <div 
      className="project-card"
      onMouseEnter={() => videoRef.current?.play()}
      onMouseLeave={() => {
        videoRef.current?.pause()
        if (videoRef.current) videoRef.current.currentTime = 0
      }}
      style={{
        background: 'var(--bg2)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        padding: '40px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.4s ease',
        cursor: 'default',
      }}>
      {/* Video Background on Hover */}
      {p.video && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0, opacity: 0, transition: 'opacity 0.6s ease',
          pointerEvents: 'none'
        }} className="project-video-container">
          <video 
            ref={videoRef}
            src={p.video}
            muted loop playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ 
            position: 'absolute', inset: 0, 
            background: 'linear-gradient(to bottom, rgba(8,12,16,0.8), rgba(8,12,16,0.95))',
            zIndex: 1 
          }} />
        </div>
      )}

      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', letterSpacing: '1px' }}>
            {p.year}
          </span>
          <span style={{
            width: '32px', height: '32px', borderRadius: '8px', background: `${p.color}15`,
            color: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '18px',
          }}>
            📦
          </span>
        </div>

        <h3 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px', letterSpacing: '-0.5px' }}>{p.title}</h3>
        <p style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: 600, marginBottom: '24px', opacity: 0.8 }}>{p.subtitle}</p>
        
        <p style={{ color: 'var(--muted2)', fontSize: '14px', lineHeight: '1.6', marginBottom: '32px' }}>
          {p.desc}
        </p>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {p.tags.map(t => (
            <span key={t} style={{
              fontSize: '10px', fontFamily: 'var(--font-mono)', padding: '6px 12px',
              background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)',
              borderRadius: '4px', color: 'var(--muted2)'
            }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

const PROJECTS = [
  {
    title: 'StockEasy',
    subtitle: 'Système de Gestion de Stock de Supérette',
    year: '2026',
    tags: ['Spring Boot', 'React JS', 'Postgres'],
    desc: 'Application web complète de gestion de stock pour supérette. Backend robuste avec Java Spring Boot, interface React JS intuitive.',
    color: '#00E5B4',
    video: 'video/StockEasy.mp4'
  },
  {
    title: 'AfrikSaveur',
    subtitle: 'Site Web de Vente de Plats Africains',
    year: '2025',
    tags: ['React JS', 'Tailwind CSS', 'Grails','Postgres'],
    desc: 'Site web de vente de plats africains. Backend Grails avec Postgres, interface React JS intuitive.',
    color: '#0095FF',
    video: 'video/AfrikSaveur.mp4'
  },
]

const EDUCATION = [
  { year: '2025 – 2026', title: 'Licence 3', place: 'Université Polytechnique de Bingerville', note: 'En cours' },
  { year: '2024 – 2025', title: 'Licence 2', place: 'Université Polytechnique de Bingerville', note: 'POO Java, Web design, Structures de données' },
  { year: '2023 – 2024', title: 'Licence 1', place: 'Université Polytechnique de Bingerville', note: 'Algorithmique, Python, Bases de données, Création web' },
  { year: '2022 – 2023', title: 'Baccalauréat BAC D', place: 'Lycée Municipal d\'Abobo', note: 'Série scientifique' },
]

const CERTS = [
  { title: 'Design Sprint Universitaire', org: 'Université de Bondoukou', year: '2025' },
  { title: 'DevFest Abidjan – Hackathon', org: 'DevFest Cloud Abidjan & Cocody', year: '2025–2026' },
  { title: 'Bootcamp technique - académie des développeurs full stack', org: 'Proactive Swiss', year: 'Avril 2026' },
]

function useInView(ref, threshold = 0.15) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref, threshold])
  return visible
}

function Section({ id, children, style }) {
  const ref = useRef()
  const visible = useInView(ref)
  return (
    <section id={id} ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(40px)',
      transition: 'opacity 0.7s ease, transform 0.7s ease',
      position: 'relative',
      zIndex: 1,
      ...style
    }}>
      {children}
    </section>
  )
}

export default function App() {
  const [activeNav, setActiveNav] = useState('Accueil')
  const [menuOpen, setMenuOpen] = useState(false)
  const [typed, setTyped] = useState('')
  const roles = ['Développeur Full-Stack', 'React & Spring Boot', 'Mobile Flutter', 'Passionné de code', 'Grails']
  const [roleIdx, setRoleIdx] = useState(0)

  useEffect(() => {
    let i = 0
    let deleting = false
    let current = roles[roleIdx]
    const interval = setInterval(() => {
      if (!deleting) {
        setTyped(current.slice(0, i + 1))
        i++
        if (i === current.length) { deleting = true; i = current.length }
      } else {
        setTyped(current.slice(0, i - 1))
        i--
        if (i === 0) {
          deleting = false
          setRoleIdx(r => (r + 1) % roles.length)
          current = roles[(roleIdx + 1) % roles.length]
        }
      }
    }, deleting ? 70 : 100)
    return () => clearInterval(interval)
  }, [roleIdx])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [menuOpen])

  const sectionStyle = {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: 'clamp(60px, 12vh, 120px) 24px',
  }

  const sectionTitle = (t) => {
    const navIndex = NAV.findIndex(n => t.toLowerCase().includes(n.toLowerCase()))
    return (
      <div style={{ marginBottom: '64px' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent)', letterSpacing: '3px', marginBottom: '12px' }}>
          {String(navIndex + 1).padStart(2, '0')} / {String(NAV.length).padStart(2, '0')}
        </p>
        <h2 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, lineHeight: 1.1 }}>{t}</h2>
        <div style={{ width: '60px', height: '3px', background: 'var(--accent)', marginTop: '16px', borderRadius: '2px' }} />
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh' }}>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 300,
        background: 'rgba(8,12,16,0.85)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        padding: '0 24px', height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ 
          fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--accent)', fontWeight: 700,
          opacity: menuOpen ? 0 : 1, transition: 'opacity 0.3s', pointerEvents: menuOpen ? 'none' : 'auto'
        }}>
        GHOST-che<span style={{ animation: 'blink 1s step-end infinite', color: 'var(--text)' }}>_</span>
        </span>

        {/* Hamburger Button */}
        <button 
          className="mobile-only"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none', border: 'none', color: 'var(--text)',
            cursor: 'pointer', padding: '12px', zIndex: 300,
            display: 'flex', flexDirection: 'column', gap: '6px'
          }}
        >
          <div style={{ 
            width: '28px', height: '2px', background: 'currentColor', transition: '0.3s', 
            transform: menuOpen ? 'translateY(8px) rotate(45deg)' : 'none',
          }} />
          <div style={{ 
            width: '28px', height: '2px', background: 'currentColor', transition: '0.3s', 
            opacity: menuOpen ? 0 : 1 
          }} />
          <div style={{ 
            width: '28px', height: '2px', background: 'currentColor', transition: '0.3s', 
            transform: menuOpen ? 'translateY(-8px) rotate(-45deg)' : 'none',
          }} />
        </button>

        {/* Desktop nav */}
        <div className="desktop-only" style={{ gap: '20px', alignItems: 'center' }}>
          {NAV.map(n => (
            <a key={n} href={`#${n.toLowerCase()}`}
              onClick={() => setActiveNav(n)}
              className="nav-link"
              style={{
                color: activeNav === n ? 'var(--accent)' : 'var(--muted2)',
              }}>
              {n}
            </a>
          ))}
          <a href="mailto:cherifkone047@gmail.com" style={{
            background: 'var(--accent)', color: '#000', fontSize: '12px',
            fontWeight: 700, padding: '8px 18px', borderRadius: '4px',
            letterSpacing: '0.5px', transition: 'opacity 0.2s',
          }}>
            Me contacter
          </a>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {NAV.map(n => (
          <a key={n} href={`#${n.toLowerCase()}`}
            onClick={() => { setActiveNav(n); setMenuOpen(false) }}
            style={{
              fontSize: '24px', fontWeight: 700,
              color: activeNav === n ? 'var(--accent)' : 'var(--text)',
              fontFamily: 'var(--font-head)'
            }}>
            {n}
          </a>
        ))}
        <a href="mailto:cherifkone047@gmail.com" onClick={() => setMenuOpen(false)} style={{
          background: 'var(--accent)', color: '#000', fontSize: '16px',
          fontWeight: 700, padding: '12px 32px', borderRadius: '4px',
          marginTop: '20px'
        }}>
          Me contacter
        </a>
      </div>

      {/* Grid bg */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
      }} />

      {/* HERO */}
      <section id="accueil" style={{
        minHeight: '100dvh', display: 'flex', alignItems: 'center',
        padding: '80px 24px 40px', maxWidth: '1100px', margin: '0 auto', position: 'relative',
        zIndex: 1,
      }}>

        <div style={{ position: 'relative', zIndex: 1, animation: 'fadeUp 0.9s ease both' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'var(--bg3)', border: '1px solid var(--border2)',
            borderRadius: '100px', padding: '6px 16px', marginBottom: '32px',
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)', animation: 'pulse 2s infinite' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted2)', letterSpacing: '1px' }}>
              DISPONIBLE POUR MATERIALISER VOS IDEES 🧠
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(40px, 8vw, 88px)', fontWeight: 800, lineHeight: 1, marginBottom: '24px' }}>
            Koné<br />
            <span style={{ color: 'var(--accent)' }}>Cherif</span><br />
            Moussa
          </h1>

          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: 'clamp(14px, 2vw, 18px)',
            color: 'var(--muted2)', marginBottom: '48px', minHeight: '28px',
          }}>
            &gt; {typed}<span style={{ animation: 'blink 1s step-end infinite' }}>|</span>
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a href="#projets" style={{
              background: 'var(--accent)', color: '#000', fontWeight: 700,
              padding: '14px 32px', borderRadius: '4px', fontSize: '14px', letterSpacing: '0.5px',
              flex: window.innerWidth < 480 ? '1' : 'initial', textAlign: 'center'
            }}>
              Voir mes projets →
            </a>
            <a href="#contact" style={{
              background: 'transparent', color: 'var(--text)', fontWeight: 600,
              padding: '14px 32px', borderRadius: '4px', fontSize: '14px',
              border: '1px solid var(--border2)',
              flex: window.innerWidth < 480 ? '1' : 'initial', textAlign: 'center'
            }}>
              Me contacter
            </a>
          </div>
        </div>

        {/* Floating badge */}
        <div style={{
          position: 'absolute', right: '5%', top: '50%', transform: 'translateY(-50%)',
          display: 'none',
        }} className="hero-badge">
          <div style={{
            width: '180px', height: '180px', borderRadius: '50%',
            border: '1px solid var(--border2)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', flexDirection: 'column', gap: '8px',
            background: 'var(--bg2)',
          }}>
            <span style={{ fontSize: '40px' }}>💻</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', textAlign: 'center', padding: '0 16px' }}>
              L3 Info<br />Bingerville
            </span>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <Section id="à propos">
        <div style={{ ...sectionStyle, textAlign: 'center' }}>
          {sectionTitle('À propos de moi')}
          
          <div style={{ 
            width: 'clamp(150px, 20vw, 220px)', 
            height: 'clamp(150px, 20vw, 220px)', 
            borderRadius: '50%', 
            overflow: 'hidden', 
            margin: '0 auto 48px',
            border: '4px solid var(--accent)',
          }}>
            <img 
              src={profilePic} 
              alt="Koné Cherif Moussa" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>

          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <p style={{ 
              fontSize: 'clamp(16px, 2vw, 20px)', 
              color: 'var(--text)', 
              marginBottom: '24px', 
              lineHeight: '1.8',
              fontWeight: 500
            }}>
              Bonjour et bienvenue sur mon Portfolio ! Je suis <span style={{ color: 'var(--accent)' }}>Koné Cherif Moussa</span>, un informaticien passionné basé à Bingerville, Abidjan, Cote d'Ivoire. 
              Mon amour pour l'informatique a commencé lorsque j'étais encore petit, et depuis, j'ai décidé de l'étudier et d'en faire mon métier.
            </p>
            <p style={{ 
              fontSize: 'clamp(16px, 2vw, 18px)', 
              color: 'var(--muted2)', 
              marginBottom: '48px', 
              lineHeight: '1.8',
              fontStyle: 'italic'
            }}>
              Je suis en Licence 3 MIAGE (Méthodes Informatiques Appliquées à la Gestion des Entreprise).
            </p>
            
            <a href="CurriculumVitae_KONE_CHERIF_MOUSSA.pdf" target="_blank" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              background: 'var(--bg2)',
              color: 'var(--text)',
              fontWeight: 700,
              padding: '16px 36px',
              borderRadius: '4px',
              fontSize: '14px',
              letterSpacing: '0.5px',
              border: '1px solid var(--border2)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={e => { 
              e.currentTarget.style.borderColor = 'var(--accent)'; 
              e.currentTarget.style.background = 'var(--bg3)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => { 
              e.currentTarget.style.borderColor = 'var(--border2)'; 
              e.currentTarget.style.background = 'var(--bg2)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              Voir le CV
            </a>
          </div>
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="compétences">
        <div style={sectionStyle}>
          {sectionTitle('Compétences')}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            {SKILLS.map((s, i) => (
              <div key={i} style={{
                background: 'var(--bg2)', border: '1px solid var(--border)',
                borderRadius: '12px', padding: '28px',
                transition: 'border-color 0.3s, transform 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none' }}
              >
                <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent)', letterSpacing: '2px', marginBottom: '20px' }}>
                  {s.cat.toUpperCase()}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {s.items.map(item => (
                    <span key={item} style={{
                      background: 'var(--bg3)', border: '1px solid var(--border2)',
                      borderRadius: '4px', padding: '4px 10px', fontSize: '13px',
                      color: 'var(--muted2)', fontWeight: 600,
                    }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projets">
        <div style={{ ...sectionStyle, background: 'var(--bg2)', maxWidth: '100%', padding: '100px 0' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
            {sectionTitle('Projets')}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
              {PROJECTS.map((p, i) => (
                <ProjectCard key={i} p={p} />
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* PARCOURS */}
      <Section id="parcours">
        <div style={sectionStyle}>
          {sectionTitle('Parcours')}
          <div className="section-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px' }}>
            {/* Formation */}
            <div>
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent)', letterSpacing: '2px', marginBottom: '32px' }}>
                FORMATION
              </h3>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '7px', top: '8px', bottom: '0', width: '1px', background: 'var(--border2)' }} />
                {EDUCATION.map((e, i) => (
                  <div key={i} style={{ display: 'flex', gap: '24px', marginBottom: '36px' }}>
                    <div style={{ width: '15px', minWidth: '15px', display: 'flex', justifyContent: 'center', paddingTop: '6px' }}>
                      <div style={{ width: '15px', height: '15px', borderRadius: '50%', background: 'var(--accent)', border: '3px solid var(--bg)' }} />
                    </div>
                    <div>
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginBottom: '4px' }}>{e.year}</p>
                      <p style={{ fontWeight: 700, fontSize: '16px', marginBottom: '4px' }}>{e.title}</p>
                      <p style={{ fontSize: '13px', color: 'var(--muted2)', marginBottom: '4px' }}>{e.place}</p>
                      <p style={{ fontSize: '12px', color: 'var(--muted)', fontStyle: 'italic' }}>{e.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent)', letterSpacing: '2px', marginBottom: '32px' }}>
                CERTIFICATIONS & ÉVÉNEMENTS
              </h3>
              {CERTS.map((c, i) => (
                <div key={i} style={{
                  background: 'var(--bg2)', border: '1px solid var(--border)',
                  borderRadius: '12px', padding: '24px', marginBottom: '16px',
                  borderLeft: '3px solid var(--accent)',
                }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent)', marginBottom: '8px' }}>{c.year}</p>
                  <p style={{ fontWeight: 700, marginBottom: '6px' }}>{c.title}</p>
                  <p style={{ fontSize: '13px', color: 'var(--muted2)' }}>{c.org}</p>
                </div>
              ))}

              {/* Langues */}
              <div style={{ marginTop: '40px' }}>
                <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent)', letterSpacing: '2px', marginBottom: '20px' }}>
                  LANGUES
                </h3>
                {[{ lang: 'Français', level: 100, label: 'Langue native' }, { lang: 'Anglais', level: 55, label: 'Intermédiaire' }].map(l => (
                  <div key={l.lang} style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 600 }}>{l.lang}</span>
                      <span style={{ fontSize: '12px', color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{l.label}</span>
                    </div>
                    <div style={{ height: '4px', background: 'var(--bg3)', borderRadius: '2px' }}>
                      <div style={{ height: '100%', width: `${l.level}%`, background: 'var(--accent)', borderRadius: '2px', transition: 'width 1s ease' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact">
        <div style={{ ...sectionStyle, textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent)', letterSpacing: '3px', marginBottom: '24px' }}>
            {String(NAV.length).padStart(2, '0')} / {String(NAV.length).padStart(2, '0')}
          </p>
          <h2 style={{ fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: 800, marginBottom: '24px', lineHeight: 1.1 }}>
            Travaillons<br /><span style={{ color: 'var(--accent)' }}>ensemble</span>
          </h2>
          <p style={{ color: 'var(--muted2)', maxWidth: '480px', margin: '0 auto 48px', fontSize: '16px', lineHeight: 1.7 }}>
            Je suis ouvert aux projets freelance. N'hésitez pas à me contacter !
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '64px' }}>
            <a href="mailto:cherifkone047@gmail.com" style={{
              background: 'var(--accent)', color: '#000', fontWeight: 700,
              padding: '16px 40px', borderRadius: '4px', fontSize: '14px', letterSpacing: '0.5px',
              flex: window.innerWidth < 480 ? '1' : 'initial', textAlign: 'center'
            }}>
              cherifkone047@gmail.com
            </a>
            <a href="tel:+2250769962476" style={{
              background: 'transparent', color: 'var(--text)', fontWeight: 600,
              padding: '16px 40px', borderRadius: '4px', fontSize: '14px',
              border: '1px solid var(--border2)',
              flex: window.innerWidth < 480 ? '1' : 'initial', textAlign: 'center'
            }}>
              +225 07 69 96 24 76
            </a>
          </div>

          <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginBottom: '32px' }}>
            <a href="https://github.com/GHOST-che" target="_blank" rel="noopener noreferrer" style={{
              color: 'var(--muted2)', transition: '0.2s', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none'
            }} onMouseOver={e => e.currentTarget.style.color = 'var(--accent)'} onMouseOut={e => e.currentTarget.style.color = 'var(--muted2)'}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              <span style={{ fontSize: '14px', fontWeight: 600 }}>GitHub</span>
            </a>
            <a href="https://linkedin.com/in/kone-cherif-moussa" target="_blank" rel="noopener noreferrer" style={{
              color: 'var(--muted2)', transition: '0.2s', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none'
            }} onMouseOver={e => e.currentTarget.style.color = 'var(--accent)'} onMouseOut={e => e.currentTarget.style.color = 'var(--muted2)'}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              <span style={{ fontSize: '14px', fontWeight: 600 }}>LinkedIn</span>
            </a>
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '40px' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)' }}>
              © 2026 Koné Cherif Moussa — Bingerville, Abidjan
            </p>
          </div>
        </div>
      </Section>
    </div>
  )
}
