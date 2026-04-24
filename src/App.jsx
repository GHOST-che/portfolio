import { useState, useEffect, useRef } from 'react'

const NAV = ['Accueil', 'Compétences', 'Projets', 'Parcours', 'Contact']

const SKILLS = [
  { cat: 'Frontend', items: ['React JS', 'Vue.js', 'HTML & CSS', 'JavaScript', 'Tailwind CSS', 'Flutter', 'Dart'] },
  { cat: 'Backend', items: ['Java Spring Boot', 'Node JS', 'Express.js', 'PHP', 'Grails', 'Python'] },
  { cat: 'Bases de données', items: ['MySQL', 'PostgreSQL', 'MariaDB', 'DBeaver', 'SQL Developer'] },
  { cat: 'Outils', items: ['Git & GitHub', 'UML', 'Power BI', 'Word', 'Excel', 'PowerPoint'] },
]

const PROJECTS = [
  {
    title: 'StockEasy',
    subtitle: 'Système de Gestion de Stock de Supérette',
    year: '2026',
    tags: ['Spring Boot', 'React JS', 'Postgres', 'UML'],
    desc: 'Application web complète de gestion de stock pour supérette. Backend robuste avec Java Spring Boot, interface React JS intuitive et modélisation UML complète du système.',
    color: '#00E5B4',
  },
  {
    title: 'AfrikSaveur',
    subtitle: 'Application Mobile type Instagram',
    year: '2025',
    tags: ['Flutter', 'Dart', 'Backend', 'Mobile'],
    desc: 'Application mobile sociale développée en équipe. Interface ergonomique, fonctionnalités de partage, gestion de la persistance des données et intégration des services backend.',
    color: '#0095FF',
  },
]

const EDUCATION = [
  { year: '2025 – 2026', title: 'Licence 3', place: 'Université Polytechnique de Bingerville', note: 'En cours' },
  { year: '2024 – 2025', title: 'Licence 2', place: 'Université Polytechnique de Bingerville', note: 'POO Java, Web design, Structures de données' },
  { year: '2023 – 2024', title: 'Licence 1', place: 'Université Polytechnique de Bingerville', note: 'Algorithmique, Python, Bases de données, Création web' },
  { year: '2022 – 2023', title: 'Baccalauréat BAC D', place: 'Lycée Municipal d\'Abobo', note: 'Série scientifique' },
]

const CERTS = [
  { title: 'Design Sprint Universitaire', org: 'Université Polytechnique de Bingerville', year: '2025–2026' },
  { title: 'DevFest Abidjan – Hackathon', org: 'DevFest Cloud Abidjan & Cocody', year: '2025–2026' },
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
  const roles = ['Développeur Full-Stack', 'React & Spring Boot', 'Mobile Flutter', 'Passionné de code']
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
    }, deleting ? 40 : 80)
    return () => clearInterval(interval)
  }, [roleIdx])

  const sectionStyle = {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '100px 24px',
  }

  const sectionTitle = (t) => (
    <div style={{ marginBottom: '64px' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent)', letterSpacing: '3px', marginBottom: '12px' }}>
        {String(NAV.indexOf(t.split(' ')[0]) + 1).padStart(2, '0')} / {String(NAV.length).padStart(2, '0')}
      </p>
      <h2 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, lineHeight: 1.1 }}>{t}</h2>
      <div style={{ width: '60px', height: '3px', background: 'var(--accent)', marginTop: '16px', borderRadius: '2px' }} />
    </div>
  )

  return (
    <div style={{ minHeight: '100vh' }}>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(8,12,16,0.85)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        padding: '0 24px', height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--accent)', fontWeight: 700 }}>
          KONE~CHERIF~MOUSSA<span style={{ animation: 'blink 1s step-end infinite', color: 'var(--text)' }}>_</span>
        </span>

        {/* Desktop nav */}
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          {NAV.map(n => (
            <a key={n} href={`#${n.toLowerCase()}`}
              onClick={() => setActiveNav(n)}
              style={{
                fontSize: '13px', fontWeight: 600, letterSpacing: '0.5px',
                color: activeNav === n ? 'var(--accent)' : 'var(--muted2)',
                transition: 'color 0.2s',
                display: window.innerWidth < 768 ? 'none' : 'block',
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

      {/* HERO */}
      <section id="accueil" style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        padding: '80px 24px 0', maxWidth: '1100px', margin: '0 auto', position: 'relative',
      }}>
        {/* Grid bg */}
        <div style={{
          position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
        }} />

        <div style={{ position: 'relative', zIndex: 1, animation: 'fadeUp 0.9s ease both' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'var(--bg3)', border: '1px solid var(--border2)',
            borderRadius: '100px', padding: '6px 16px', marginBottom: '32px',
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)', animation: 'pulse 2s infinite' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted2)', letterSpacing: '1px' }}>
              DISPONIBLE POUR UN STAGE
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
            }}>
              Voir mes projets →
            </a>
            <a href="#contact" style={{
              background: 'transparent', color: 'var(--text)', fontWeight: 600,
              padding: '14px 32px', borderRadius: '4px', fontSize: '14px',
              border: '1px solid var(--border2)',
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
                <div key={i} style={{
                  background: 'var(--bg)', border: '1px solid var(--border)',
                  borderRadius: '16px', padding: '36px', position: 'relative', overflow: 'hidden',
                  transition: 'border-color 0.3s, transform 0.3s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = p.color; e.currentTarget.style.transform = 'translateY(-6px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none' }}
                >
                  {/* Glow */}
                  <div style={{
                    position: 'absolute', top: 0, right: 0,
                    width: '200px', height: '200px',
                    background: `radial-gradient(circle at top right, ${p.color}15 0%, transparent 70%)`,
                    pointerEvents: 'none',
                  }} />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: p.color, letterSpacing: '2px' }}>
                      {p.year}
                    </span>
                    <span style={{
                      width: '40px', height: '40px', borderRadius: '8px',
                      background: `${p.color}20`, border: `1px solid ${p.color}40`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '18px',
                    }}>
                      {i === 0 ? '📦' : '📱'}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px', color: p.color }}>{p.title}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '20px', fontWeight: 600 }}>{p.subtitle}</p>
                  <p style={{ fontSize: '14px', color: 'var(--muted2)', lineHeight: '1.7', marginBottom: '28px' }}>{p.desc}</p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {p.tags.map(t => (
                      <span key={t} style={{
                        fontFamily: 'var(--font-mono)', fontSize: '11px', padding: '4px 10px',
                        background: `${p.color}15`, color: p.color,
                        border: `1px solid ${p.color}30`, borderRadius: '4px',
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* PARCOURS */}
      <Section id="parcours">
        <div style={sectionStyle}>
          {sectionTitle('Parcours')}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px' }}>
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
            05 / 05
          </p>
          <h2 style={{ fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: 800, marginBottom: '24px', lineHeight: 1.1 }}>
            Travaillons<br /><span style={{ color: 'var(--accent)' }}>ensemble</span>
          </h2>
          <p style={{ color: 'var(--muted2)', maxWidth: '480px', margin: '0 auto 48px', fontSize: '16px', lineHeight: 1.7 }}>
            Je suis ouvert aux stages, alternances et projets freelance. N'hésitez pas à me contacter !
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '64px' }}>
            <a href="mailto:cherifkone047@gmail.com" style={{
              background: 'var(--accent)', color: '#000', fontWeight: 700,
              padding: '16px 40px', borderRadius: '4px', fontSize: '14px', letterSpacing: '0.5px',
            }}>
              cherifkone047@gmail.com
            </a>
            <a href="tel:+2250769962476" style={{
              background: 'transparent', color: 'var(--text)', fontWeight: 600,
              padding: '16px 40px', borderRadius: '4px', fontSize: '14px',
              border: '1px solid var(--border2)',
            }}>
              +225 07 69 96 24 76
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
