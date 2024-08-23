import { Usuario } from '../interfaces/usuario';
import { Curso } from '../interfaces/curso';

export interface InscripcionesState {
  usuarios: Usuario[];
  cursos: Curso[];
  loading: boolean;
  error: any;
}
