import { programa } from '../../data/programa'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section id="inicio" className={styles.hero}>
      <div className="contenedor">
        <div className={styles.grid}>

          {/* Texto principal */}
          <div className={styles.texto}>
            <div className={styles.badge}>⚕ Programa Acreditado · CAFME</div>
            <h1 className={styles.titulo}>
              Formando médicos<br />
              para el <em>Perú del futuro</em>
            </h1>
            <p className={styles.descripcion}>
              Más de 65 años de excelencia académica, práctica clínica
              intensiva y compromiso con la salud pública de La Libertad
              y el norte del país.
            </p>
            <div className={styles.acciones}>
              <a href="#" className="btn-primario">Proceso de Admisión</a>
              <a href="#nosotros" className="btn-secundario">Conoce el programa →</a>
            </div>
          </div>

          {/* Panel de estadísticas */}
          <div className={styles.statsPanel}>
            <div className={styles.statsHeader}>
              <p>Programa Académico</p>
              <strong>{programa.nombre} — UNT</strong>
            </div>
            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <div className={styles.statNum}>7</div>
                <div className={styles.statLbl}>Años de duración</div>
                <div className={styles.statSub}>14 semestres</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNum}>{programa.creditos}</div>
                <div className={styles.statLbl}>Total créditos</div>
                <div className={styles.statSub}>Oblig. + electivos</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNum}>8</div>
                <div className={styles.statLbl}>Convenios activos</div>
                <div className={styles.statSub}>2 internacionales</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNum}>30+</div>
                <div className={styles.statLbl}>Especialidades</div>
                <div className={styles.statSub}>Posgrado residentado</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
