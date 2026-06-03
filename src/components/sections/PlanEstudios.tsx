import { useEffect, useRef, useState } from 'react'
import { programa } from '../../data/programa'
import styles from './PlanEstudios.module.css'

// ─── Hook limpio basado en prop "visible" ───────────────
function useCountUp(target: number, duration = 1800, visible: boolean) {
  const [count, setCount] = useState(0)
  const rafRef     = useRef<number>(0)
  const startedRef = useRef(false)

  // Efecto que inicia la animación — sin cleanup para no cancelarla
  useEffect(() => {
    if (!visible || startedRef.current) return
    startedRef.current = true

    const startTime = performance.now()

    const animate = (now: number) => {
      const elapsed  = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased    = 1 - Math.pow(1 - progress, 4)
      setCount(Math.round(eased * target))

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        setCount(target) // valor exacto garantizado
      }
    }

    rafRef.current = requestAnimationFrame(animate)
  }, [visible, target, duration])

  // Cleanup solo al desmontar el componente
  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return count
}

// ─── Componente: dato animado ───────────────────────────
function DatoAnimado({
  valor,
  sufijo = '',
  etiqueta,
  nota,
  visible,
}: {
  valor: number
  sufijo?: string
  etiqueta: string
  nota: string
  visible: boolean
}) {
  const count = useCountUp(valor, 1800, visible)

  return (
    <div className={styles.dato}>
      <div className={styles.datoValor}>{count}{sufijo}</div>
      <div className={styles.datoEtiqueta}>{etiqueta}</div>
      <div className={styles.datoNota}>{nota}</div>
    </div>
  )
}

// ─── Perfil del egresado ────────────────────────────────
const perfilEgresado = [
  {
    num: '1',
    titulo: 'Atención Clínica y Quirúrgica',
    descripcion:
      'Ejecuta diagnósticos precisos basados en evidencia, tratamientos oportunos y procedimientos de emergencia, con dominio de los sistemas de referencia en todos los niveles de complejidad hospitalaria.',
  },
  {
    num: '2',
    titulo: 'Salud Pública y Gestión Comunitaria',
    descripcion:
      'Gestiona recursos de salud alineados a políticas nacionales, diseña intervenciones de promoción y prevención e interviene en la comunidad desde los primeros ciclos de formación.',
  },
  {
    num: '3',
    titulo: 'Investigación y Tecnología Médica',
    descripcion:
      'Identifica problemas clínicos, revisa literatura científica en bases internacionales y diseña proyectos de investigación aplicados para mejorar la práctica médica.',
  },
]

// ─── Componente principal ───────────────────────────────
export default function PlanEstudios() {
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    // Si ya está visible al cargar (reload con scroll), activa inmediato
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="plan-estudios" className="seccion-alt">
      <div className="contenedor">
        <div className="etiqueta-seccion">Currículo 2018 v3.0</div>
        <h2 className="titulo-seccion">Plan de Estudios</h2>

        {/* Datos clave animados */}
        <div className={styles.datosGrid} ref={sectionRef}>
          <DatoAnimado
            valor={7}
            etiqueta="Años de duración"
            nota="14 semestres académicos"
            visible={visible}
          />
          <DatoAnimado
            valor={programa.creditos}
            etiqueta="Total de créditos"
            nota="Obligatorios + Electivos"
            visible={visible}
          />
          <DatoAnimado
            valor={100}
            sufijo="%"
            etiqueta="Titulados por tesis"
            nota={`${programa.grado} + ${programa.titulo}`}
            visible={visible}
          />
          <DatoAnimado
            valor={14}
            etiqueta="Créditos Anatomía"
            nota="Asignatura anual, 2.° año"
            visible={visible}
          />
        </div>

        {/* Malla curricular */}
        <div className={styles.mallaSection}>
          <div className={styles.perfilTitulo}>Malla Curricular</div>
          <div className={styles.mallaContainer}>
            <img
              src="/malla-curricular.png"
              alt="Malla Curricular Medicina Humana UNT 2018"
              className={styles.mallaImg}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none'
                const parent = (e.target as HTMLImageElement).parentElement
                if (parent) {
                  parent.innerHTML = `
                    <div class="${styles.mallaPlaceholder}">
                      <span>📄</span>
                      <p>Malla Curricular</p>
                      <small>Agrega tu imagen en /public/malla-curricular.png</small>
                    </div>
                  `
                }
              }}
            />
          </div>
          <a href="/malla-curricular.pdf" className={styles.linkDescarga}>
            ↓ Descargar Malla Curricular 2018 (PDF)
          </a>
        </div>

        {/* Perfil del egresado */}
        <div className={styles.perfilTitulo}>Perfil del Egresado</div>
        <div className={styles.perfilGrid}>
          {perfilEgresado.map(item => (
            <div key={item.num} className={styles.perfilItem}>
              <div className={styles.perfilNumBg}>{item.num}</div>
              <h4 className={styles.perfilTituloItem}>{item.titulo}</h4>
              <p className={styles.perfilDesc}>{item.descripcion}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
