import { programa } from '../../data/programa'
import styles from './Nosotros.module.css'

export default function Nosotros() {
  return (
    <section id="nosotros" className="seccion">
      <div className="contenedor">
        <div className="etiqueta-seccion">La Escuela</div>
        <h2 className="titulo-seccion">Quiénes somos</h2>

        {/* Misión y Visión */}
        <div className={styles.mvGrid}>
          <div className={styles.mvCard}>
            <h3>Misión</h3>
            <p>{programa.mision}</p>
          </div>
          <div className={styles.mvCard}>
            <h3>Visión 2030</h3>
            <p>{programa.vision}</p>
          </div>
        </div>

        {/* Objetivos académicos */}
        <div className={styles.objetivosLabel}>Objetivos Académicos</div>
        <div className={styles.objGrid}>
          {programa.objetivos.map((obj, index) => (
            <div key={index} className={styles.objItem}>
              <div className={styles.objNum}>
                {String(index + 1).padStart(2, '0')}
              </div>
              <div className={styles.objTxt}>{obj}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
