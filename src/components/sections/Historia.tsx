import { historia } from '../../data/historia'
import styles from './Historia.module.css'

export default function Historia() {
  return (
    <section id="historia" className="seccion-alt">
      <div className="contenedor">
        <div className="etiqueta-seccion">Trayectoria Institucional</div>
        <h2 className="titulo-seccion">Historia de la Facultad</h2>

        <div className={styles.layout}>

          {/* Columna izquierda */}
          <div className={styles.intro}>
            <div className={styles.anioFundacion}>1957</div>
            <div className={styles.anioReal}>1957</div>
            <div className={styles.anioSub}>Año de fundación</div>
            <p className={styles.introTexto}>
              Casi siete décadas formando los médicos que cuidan la
              salud del norte del Perú. La Facultad de Medicina de la
              UNT nació de la visión de una región que merecía su
              propia escuela médica.
            </p>
            <p className={styles.introTexto}>
              Primera facultad del norte del país en lograr la
              acreditación CAFME en el año 2002.
            </p>
          </div>

          {/* Timeline */}
          <div className={styles.timeline}>
            {historia.map(hito => (
              <div
                key={hito.id}
                className={`${styles.item} ${hito.destacado ? styles.destacado : ''}`}
              >
                <div className={styles.anio}>{hito.anio}</div>
                <div className={styles.contenido}>
                  <h4 className={styles.titulo}>
                    {hito.titulo}
                    {hito.destacado && (
                      <span className={styles.star}> ⭐</span>
                    )}
                  </h4>
                  <p className={styles.descripcion}>{hito.descripcion}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
