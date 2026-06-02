// ============================================================
// TIPOS GLOBALES - Medicina UNT
// ============================================================

// ------------------------------------------------------------
// Enumeraciones
// ------------------------------------------------------------

export type Genero = 'masculino' | 'femenino' | 'otro';

export type EstadoAcademico =
  | 'activo'
  | 'inactivo'
  | 'egresado'
  | 'suspendido'
  | 'graduado';

export type TipoDocente =
  | 'titular'
  | 'asociado'
  | 'auxiliar'
  | 'contratado'
  | 'jefe_practica';

export type TipoEvaluacion =
  | 'parcial'
  | 'final'
  | 'sustitutorio'
  | 'practica'
  | 'trabajo';

export type EstadoAsignatura = 'aprobado' | 'desaprobado' | 'retirado' | 'pendiente';

export type NivelAcreditacion = 'excelente' | 'bueno' | 'regular' | 'deficiente';

export type TipoEvidencia =
  | 'documento'
  | 'imagen'
  | 'video'
  | 'enlace'
  | 'reporte';

// ------------------------------------------------------------
// Entidades base
// ------------------------------------------------------------

export interface Persona {
  id: string;
  nombres: string;
  apellidos: string;
  dni: string;
  genero: Genero;
  fechaNacimiento: string; // ISO 8601
  email: string;
  telefono?: string;
  direccion?: string;
  foto?: string; // URL o base64
}

// ------------------------------------------------------------
// Estudiante
// ------------------------------------------------------------

export interface Estudiante extends Persona {
  codigoEstudiante: string;
  ciclo: number;                   // 1 al 12
  creditos: number;                // Créditos acumulados
  promedioPonderado: number;
  estadoAcademico: EstadoAcademico;
  fechaIngreso: string;            // ISO 8601
  modalidadIngreso: string;        // e.g. "Ordinario", "CEPU"
  asignaturas: AsignaturaEstudiante[];
}

export interface AsignaturaEstudiante {
  asignaturaId: string;
  nombre: string;
  ciclo: number;
  creditos: number;
  notaFinal?: number;
  estado: EstadoAcademico;
  evaluaciones: Evaluacion[];
}

export interface Evaluacion {
  id: string;
  tipo: TipoEvaluacion;
  nota: number;
  peso: number;            // Porcentaje de la nota final (0-100)
  fecha: string;           // ISO 8601
  observaciones?: string;
}

// ─── DOCENTE ────────────────────────────────────────────
export interface Docente {
  id: number
  nombre: string
  initials: string
  grado: string
  cargo?: string
  departamento: string
  foto?: string
  email?: string
}

export interface Publicacion {
  id: string;
  titulo: string;
  revista?: string;
  anio: number;
  autores: string[];
  doi?: string;
  tipo: 'articulo' | 'libro' | 'capitulo' | 'tesis' | 'ponencia';
}

// ------------------------------------------------------------
// Asignatura / Curso
// ------------------------------------------------------------

export interface Asignatura {
  id: string;
  codigo: string;
  nombre: string;
  ciclo: number;
  creditos: number;
  horasTeoria: number;
  horasPractica: number;
  prerequisitos: string[];         // IDs de asignaturas prerequisito
  descripcion?: string;
  silabo?: Silabo;
  docenteId?: string;
}

export interface Silabo {
  id: string;
  anio: number;
  semestre: 'I' | 'II';
  competencias: string[];
  unidades: UnidadAprendizaje[];
  bibliografia: string[];
  aprobado: boolean;
}

export interface UnidadAprendizaje {
  numero: number;
  titulo: string;
  semanas: number;
  temas: string[];
  logros: string[];
}

// ------------------------------------------------------------
// Plan de Estudios
// ------------------------------------------------------------

export interface PlanEstudios {
  id: string;
  codigo: string;
  version: string;
  anioVigencia: number;
  totalCreditos: number;
  creditosObligatorios: number;
  creditosElectivos: number;
  ciclos: CicloPlan[];
  aprobadoFecha?: string;
}

export interface CicloPlan {
  numero: number;
  asignaturas: Asignatura[];
  creditosTotales: number;
}

// ------------------------------------------------------------
// Acreditación
// ------------------------------------------------------------

export interface ProcesoAcreditacion {
  id: string;
  organismo: string;            // e.g. "SINEACE", "CONEAU"
  tipo: 'institucional' | 'programa';
  estado: 'en_proceso' | 'evaluado' | 'acreditado' | 'observado';
  fechaInicio: string;
  fechaFin?: string;
  anioVigencia?: number;
  estandares: Estandar[];
  responsableId: string;        // ID del docente responsable
}

export interface Estandar {
  id: string;
  codigo: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  subcategoria?: string;
  nivel: NivelAcreditacion;
  puntaje: number;
  puntajeMaximo: number;
  evidencias: Evidencia[];
  observaciones?: string;
}

export interface Evidencia {
  id: string;
  titulo: string;
  descripcion?: string;
  tipo: TipoEvidencia;
  url?: string;
  archivo?: string;
  fechaCarga: string;
  responsable: string;
  verificado: boolean;
}

// ------------------------------------------------------------
// Departamento / Área
// ------------------------------------------------------------

export interface Departamento {
  id: string;
  nombre: string;
  codigo: string;
  jefe?: string;               // ID del docente jefe
  descripcion?: string;
  docentes: string[];          // IDs de docentes
  asignaturas: string[];       // IDs de asignaturas
}

// ------------------------------------------------------------
// Semestre Académico
// ------------------------------------------------------------

export interface SemestreAcademico {
  id: string;
  anio: number;
  semestre: 'I' | 'II';
  fechaInicio: string;
  fechaFin: string;
  activo: boolean;
  matriculaAbierta: boolean;
}

// ------------------------------------------------------------
// Matrícula
// ------------------------------------------------------------

export interface Matricula {
  id: string;
  estudianteId: string;
  semestreId: string;
  fechaMatricula: string;
  asignaturas: string[];        // IDs de asignaturas matriculadas
  estado: 'regular' | 'condicional' | 'anulada';
  observaciones?: string;
}

// ------------------------------------------------------------
// Utilidades de UI / Navegación
// ------------------------------------------------------------

export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
  children?: NavItem[];
  roles?: string[];
}

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

// ------------------------------------------------------------
// Estadísticas / Dashboard
// ------------------------------------------------------------

export interface EstadisticaGeneral {
  totalEstudiantes: number;
  totalDocentes: number;
  totalAsignaturas: number;
  promedioGeneral: number;
  tasaAprobacion: number;       // 0-100
  tasaDesercion: number;        // 0-100
  acreditaciones: number;
}

export interface DatoGrafico {
  label: string;
  valor: number;
  color?: string;
  extra?: Record<string, unknown>;
}

// ─── PROGRAMA ───────────────────────────────────────────
export interface Programa {
  nombre: string
  facultad: string
  grado: string
  titulo: string
  duracion: string
  semestres: number
  creditos: number
  modalidad: string
  mision: string
  vision: string
  objetivos: string[]
}

// ─── CONVENIO ───────────────────────────────────────────
export interface Convenio {
  id: number
  nombre: string
  tipo: 'nacional' | 'internacional'
  resolucion: string
  vigencia: string
  pais?: string
  estado: 'vigente' | 'vencido'
}

// ─── NOTICIA ────────────────────────────────────────────
export interface Noticia {
  id: number
  titulo: string
  resumen: string
  fecha: string
  tag: string
}

// ─── HITO HISTÓRICO ─────────────────────────────────────
export interface Hito {
  id: number
  anio: string
  titulo: string
  descripcion: string
  destacado?: boolean
}
