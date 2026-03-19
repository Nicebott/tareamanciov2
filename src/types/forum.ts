export interface Topic {
  id: string;
  titulo: string;
  descripcion: string;
  creador: string;
  creadorNombre: string;
  creadoEn: string;
  mensajesCount?: number;
  isAdmin?: boolean;
}

export interface Message {
  id: string;
  contenido: string;
  autor: string;
  autorNombre: string;
  creadoEn: string;
  isAdmin?: boolean;
}
