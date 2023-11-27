export interface Usuario {
  nombre: string
  apellido: string
  legajo: number
}

export interface Cliente {
  id: string
  razon_social: string
  cuit: number
}

export interface Producto {
  id: string
  Producto: string
}

export interface Version {
  id: string
  productoId: string
  version: string
}

export interface Tarea {
  project_id: string;
  estado: "Sin Comenzar" | "En Progreso" | "Finalizado" | "Bloqueado";
  fechaInicio: string;
  fechaFin: string;
  prioridad: string;
  asignado: string;
  titulo: string;
  id: string;
  descripcion: string;
}


export interface Proyecto {
  id: string;
  lider: string;
  estado: string;
  nombre: string;
  fechaFin?: string;
  fechaInicio?: string;
}

