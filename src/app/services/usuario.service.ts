import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  listAlumnos: Usuario[] = [
    {usuario: 'nrios', nombre: 'Nicolas', apellido: 'Rios', curso: 'Matematicas'},
    {usuario: 'karl', nombre: 'Karla', apellido: 'Contreras', curso: 'Lenguaje'},
    {usuario: 'paulitax', nombre: 'Paulita', apellido: 'Contreras', curso: 'Historia'},
    {usuario: 'minet', nombre: 'Minette', apellido: 'Rios', curso: 'Matematicas'},
    {usuario: 'luks', nombre: 'Lukas', apellido: 'Contreras', curso: 'Matematicas'},
    {usuario: 'yayox', nombre: 'Yayo', apellido: 'Contrerax', curso: 'Historia'},
    {usuario: 'benjx', nombre: 'Benjax', apellido: 'Trerascon', curso: 'Matematicas'},
  ];

  constructor() { }

  getAlumnos(){
    return this.listAlumnos.slice();
  }

  eliminarAlumnos(index: number){
    this.listAlumnos.splice(index, 1);
  }

  agregarUsuario(usuario: Usuario){
    this.listAlumnos.unshift(usuario)
  }

  editarUsuario(updatedUsuario: Usuario): void {
    const index = this.listAlumnos.findIndex(u => u.usuario === updatedUsuario.usuario);
    if (index !== -1) {
      this.listAlumnos[index] = updatedUsuario;
    }
  }
}
