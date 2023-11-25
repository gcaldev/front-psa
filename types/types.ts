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

export interface Proyecto {
  id: string;
  lider: string;
  estado: string;
  fechaInicio: string | null;
  fechaFin: string | null;
  nombre: string;
}

