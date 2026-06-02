import { useState } from 'react'
import { convenios } from '../../data/convenios'
import styles from './Convenios.module.css'

export default function Convenios() {
  const [tabActiva, setTabActiva] = useState<'nacional' | 'internacional'>('nacional')

  const filtrados = convenios.filter(c => c.tipo === tabActiva)

  return (
    <section id="convenios" className="seccion">
      <div className="contenedor">

        {/* Header con cifras */}
        <div className={styles.intro}>
          <div className={styles.textoIntro}>
            <div className="etiqueta-seccion">Alianzas Estratégicas</div>
            <h2 className="titulo-seccion">Convenios Docente-Asistenciales</h2>
            <p className="descripcion-seccion">
              Red de hospitales y centros de salud donde nuestros
              estudiantes realizan prácticas clínicas supervisadas,
              con cobertura local, nacional e internacional.
            </p>
          </div>

          <div className={styles.cifras}>
            <div className={styles.cifraItem}>
              <div className={styles.cifraVal}>8</div>
              <div className={styles.cifraLbl}>Convenios vigentes</div>
            </div>
            <div className={styles.cifraItem}>
              <div className={styles.cifraVal}>2</div>
              <div className={styles.cifraLbl}>Internacionales</div>
            </div>
            <div className={styles.cifraItem}>
              <div className={styles.cifraVal}>6</div>
              <div className={styles.cifraLbl}>Nacionales</div>
            </div>
            <div className={styles.cifraItem}>
              <div className={styles.cifraVal}>2027</div>
              <div className={styles.cifraLbl}>Vigencia principal</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${tabActiva === 'nacional' ? styles.tabActivo : ''}`}
            onClick={() => setTabActiva('nacional')}
          >
            🇵🇪 Nacionales
          </button>
          <button
            className={`${styles.tab} ${tabActiva === 'internacional' ? styles.tabActivo : ''}`}
            onClick={() => setTabActiva('internacional')}
          >
            🌎 Internacionales
          </button>
        </div>

        {/* Tabla */}
        <table className={styles.tabla}>
          <thead>
            <tr>
              <th>Entidad de Salud</th>
              <th>Tipo</th>
              <th>Resolución</th>
              {tabActiva === 'internacional' && <th>País</th>}
              <th>Vigencia</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map(conv => (
              <tr key={conv.id}>
                <td className={styles.entidad}>{conv.nombre}</td>
                <td>Convenio {conv.tipo === 'nacional' ? 'Específico' : 'Internacional'}</td>
                <td>{conv.resolucion}</td>
                {tabActiva === 'internacional' && (
                  <td>
                    <span className="pill pill-azul">{conv.pais}</span>
                  </td>
                )}
                <td>{conv.vigencia}</td>
                <td>
                  <span className="pill pill-verde">
                    {conv.estado.charAt(0).toUpperCase() + conv.estado.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </section>
  )
}
