export interface Usuario {
  nombre: string
  apellido: string
  legajo: number
}

export interface Cliente {
  id: string
  razonSocial: string
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
export interface Ticket {
  id_ticket: string
  nombre: string
  descripcion: string
  fecha_de_creacion: string
  estado: string
  severidad: string
  prioridad: string
  cliente: string
  asignado: string,
  comentarios: string
  producto_id: string
  version_id: string
}
export interface Tarea {
  projectId: string;
  estado: "No Iniciado" | "En Progreso" | "Finalizado" | "Bloqueado";
  fechaInicio: string;
  fechaFin: string;
  prioridad: string;
  asignado: string;
  titulo: string;
  id: string;
  descripcion: string;
}

export interface TaskTicketAsoc {
  taskId: string;
  ticketId: string;
}

export interface Recurso {
  legajo: string;
  nombre: string;
  apellido: string;
}

export interface TaskTicket {
  taskId: string;
  ticketId: string;
}
export interface Proyecto {
  id: string;
  lider: string;
  estado: string;
  nombre: string;
  fechaFin?: string;
  fechaInicio?: string;
}

