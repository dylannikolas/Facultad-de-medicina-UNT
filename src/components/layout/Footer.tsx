import { programa } from '../../data/programa'
import styles from './Footer.module.css'

export default function Footer() {
  const navLinks = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'nosotros', label: 'Nosotros' },
    { id: 'noticias', label: 'Noticias' },
    { id: 'plana-docente', label: 'Plana Docente' },
    { id: 'historia', label: 'Historia' },
  ]

  const academLinks = [
    { label: 'Plan de Estudios' },
    { label: 'Sílabos' },
    { label: 'Perfil del Egresado' },
    { label: 'Posgrado' },
    { label: 'Convenios' },
  ]

  return (
    <footer className={styles.footer}>
      <div className="contenedor">
        <div className={styles.grid}>

          {/* Columna 1 — Info */}
          <div>
            <div className={styles.logoText}>{programa.nombre}</div>
            <div className={styles.logoSub}>{programa.facultad}</div>
            <p className={styles.desc}>
              Formando médicos íntegros y competentes para el servicio
              de la salud regional y nacional desde 1957.
            </p>
          </div>

          {/* Columna 2 — Navegación */}
          <div>
            <h5 className={styles.colTitulo}>Navegación</h5>
            <ul className={styles.lista}>
              {navLinks.map(link => (
                <li key={link.id}>
                  <a href={`#${link.id}`}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3 — Académico */}
          <div>
            <h5 className={styles.colTitulo}>Académico</h5>
            <ul className={styles.lista}>
              {academLinks.map(link => (
                <li key={link.label}>
                  <a href="#">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4 — Contacto */}
          <div>
            <h5 className={styles.colTitulo}>Contacto</h5>
            <div className={styles.contacto}>
              <p>📍 Jr. Salaverry N° 555, Trujillo</p>
              <p>📞 (044) 23-3044</p>
              <p>📧 facmed@unitru.edu.pe</p>
              <p>
                🌐{' '}
                <a href="#" className={styles.linkOro}>
                  facmed.unitru.edu.pe
                </a>
              </p>
            </div>
          </div>

        </div>

        {/* Footer bottom */}
        <div className={styles.bottom}>
          <span>
            © 2025 Universidad Nacional de Trujillo · {programa.nombre}
          </span>
          <span>
            <a href="#">Transparencia</a> · <a href="#">Portal UNT</a>
          </span>
        </div>
      </div>
    </footer>
  )
}
