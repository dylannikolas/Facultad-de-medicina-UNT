import { useEffect, useRef, useState } from 'react'
import { programa } from '../../data/programa'
import styles from './PlanEstudios.module.css'

// ─── Hook robusto con flag "ya empezó" ──────────────────
function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0)
  const rafRef    = useRef<number>(0)
  const startedRef = useRef(false)  // ← evita reinicios

  const start = () => {
    if (startedRef.current) return  // ya está corriendo
    startedRef.current = true

    const startTime = performance.now()

    const animate = (now: number) => {
      const elapsed  = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // easeOutQuart: empieza rápido, termina suave
      const eased    = 1 - Math.pow(1 - progress, 4)
      const current  = Math.round(eased * target)

      setCount(current)

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        setCount(target)  // garantiza valor exacto al final
      }
    }

    rafRef.current = requestAnimationFrame(animate)
  }

  // Limpieza solo al desmontar el componente
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return { count, start }
}

// ─── Componente: dato animado ───────────────────────────
function DatoAnimado({
  valor,
  sufijo = '',
  etiqueta,
  nota,
  onReady,
}: {
  valor: number
  sufijo?: string
  etiqueta: string
  nota: string
  onReady: (startFn: () => void) => void
}) {
  const { count, start } = useCountUp(valor)

  // Le pasa la función start al padre para que la llame
  useEffect(() => {
    onReady(start)
  }, [])  // eslint-disable-line

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
  const sectionRef  = useRef<HTMLDivElement>(null)
  const startFnsRef = useRef<(() => void)[]>([])

  const registrarStart = (fn: () => void) => {
    startFnsRef.current.push(fn)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Dispara todas las animaciones a la vez
          startFnsRef.current.forEach(fn => fn())
          // Deja de observar — solo anima una vez
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
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
            onReady={registrarStart}
          />
          <DatoAnimado
            valor={programa.creditos}
            etiqueta="Total de créditos"
            nota="Obligatorios + Electivos"
            onReady={registrarStart}
          />
          <DatoAnimado
            valor={100}
            sufijo="%"
            etiqueta="Titulados por tesis"
            nota={`${programa.grado} + ${programa.titulo}`}
            onReady={registrarStart}
          />
          <DatoAnimado
            valor={14}
            etiqueta="Créditos Anatomía"
            nota="Asignatura anual, 2.° año"
            onReady={registrarStart}
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
