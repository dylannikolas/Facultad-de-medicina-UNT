import { docentes } from '../../data/docentes'
import styles from './PlanaDocente.module.css'

export default function PlanaDocente() {
  // Duplicamos el array para el efecto infinito
  const docentesLoop = [...docentes, ...docentes]

  return (
    <section id="plana-docente" className="seccion">
      <div className="contenedor">
        <div className="etiqueta-seccion">Cuerpo Académico</div>
        <h2 className="titulo-seccion">Plana Docente</h2>
        <p className="descripcion-seccion">
          Docentes especializados que combinan la excelencia académica
          con la práctica clínica activa en los principales hospitales
          de La Libertad.
        </p>
      </div>

      {/* Carrusel — fuera del contenedor para ancho completo */}
      <div className={styles.carruselWrapper}>

        {/* Máscara de degradado en los bordes */}
        <div className={styles.maskLeft} />
        <div className={styles.maskRight} />

        {/* Track animado */}
        <div className={styles.carruselTrack}>
          {docentesLoop.map((docente, index) => (
            <div key={`${docente.id}-${index}`} className={styles.card}>
              <div className={styles.avatar}>{docente.initials}</div>
              <div className={styles.info}>
                {docente.cargo && (
                  <div className={styles.cargo}>{docente.cargo}</div>
                )}
                <div className={styles.grado}>{docente.grado}</div>
                <div className={styles.nombre}>{docente.nombre}</div>
                <div className={styles.departamento}>
                  {docente.departamento}
                </div>
                {docente.email && (
                  <a
                    href={`mailto:${docente.email}`}
                    className={styles.email}
                  >
                    {docente.email}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
