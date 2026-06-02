import { noticias } from '../../data/noticias'
import styles from './Noticias.module.css'

export default function Noticias() {
  return (
    <section id="noticias" className="seccion-alt">
      <div className="contenedor">
        <div className="etiqueta-seccion">Actualidad</div>
        <h2 className="titulo-seccion">Últimas Noticias</h2>

        <div className={styles.grid}>
          {noticias.map(noticia => (
            <div key={noticia.id} className={styles.card}>
              <div className={styles.banda} />
              <div className={styles.cuerpo}>
                <div className={styles.tag}>{noticia.tag}</div>
                <div className={styles.fecha}>📅 {noticia.fecha}</div>
                <h3 className={styles.titulo}>{noticia.titulo}</h3>
                <p className={styles.resumen}>{noticia.resumen}</p>
                <a href="#" className={styles.leer}>Leer más →</a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
