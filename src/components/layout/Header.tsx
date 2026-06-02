import { useState, useEffect } from 'react'
import { programa } from '../../data/programa'
import styles from './Header.module.css'

export default function Header() {
  const [activo, setActivo] = useState('inicio')

  useEffect(() => {
    const secciones = document.querySelectorAll('section[id]')
    const handler = () => {
      let actual = ''
      secciones.forEach(sec => {
        if (window.scrollY >= (sec as HTMLElement).offsetTop - 80) {
          actual = sec.getAttribute('id') || ''
        }
      })
      setActivo(actual)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const links = [
    { id: 'inicio',        label: 'Inicio' },
    { id: 'nosotros',      label: 'Nosotros' },
    { id: 'noticias',      label: 'Noticias' },
    { id: 'plana-docente', label: 'Plana Docente' },
    { id: 'historia',      label: 'Historia' },
  ]

  return (
    <>
      {/* Barra institucional */}
      <div className={styles.barraInst}>
        <div className={styles.barraInner}>
          <div>
            <a href="#">Universidad Nacional de Trujillo</a>
            <span className={styles.sep}>|</span>
            <a href="#">Portal Estudiantil</a>
            <span className={styles.sep}>|</span>
            <a href="#">Admisión 2025</a>
          </div>
          <div>📧 facmed@unitru.edu.pe · (044) 23-3044</div>
        </div>
      </div>

      {/* Header principal */}
      <header className={styles.header}>
        <div className={styles.inner}>

          {/* Logo */}
          <div className={styles.logo}>
            <div className={styles.logoCirculo}>UNT</div>
            <div className={styles.logoInfo}>
              <span className={styles.uni}>Universidad Nacional de Trujillo</span>
              <span className={styles.fac}>{programa.facultad}</span>
            </div>
          </div>

          <div className={styles.vLine} />

          <div className={styles.programa}>{programa.nombre}</div>

          {/* Nav */}
          <nav className={styles.nav}>
            {links.map(link => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={activo === link.id ? styles.activo : ''}
              >
                {link.label}
              </a>
            ))}
          </nav>

        </div>
      </header>
    </>
  )
}
