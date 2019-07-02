import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'length'
})
export class LengthPipe implements PipeTransform {

  transform(palabra:string): string {
    if(palabra)
      return palabra.substr(0,15)+"...";
    
    return palabra;
  }

}
