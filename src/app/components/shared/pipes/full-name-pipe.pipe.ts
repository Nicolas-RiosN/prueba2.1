import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullNamePipe'
})
export class FullNamePipePipe implements PipeTransform {

  transform(usuario: any): string {
    return `${usuario.nombre} ${usuario.apellido}`;
  }

}