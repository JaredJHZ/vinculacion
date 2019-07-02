import { AbstractControl } from '@angular/forms';
import { MainserviceService } from '../mainservice.service';
import { map } from 'rxjs/operators';


export class ValidarAlumno {
  static createValidator(_mainsService: MainserviceService) {
    return (control: AbstractControl) => {
        
        return _mainsService.getEstudiante(control.value)
                .pipe(
                    map(
                        (data) => {
                            return data ? null : {errorMaestro:true};
                        }
                    )
                )
      
    };
  }
}