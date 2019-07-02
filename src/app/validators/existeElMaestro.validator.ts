import { AbstractControl } from '@angular/forms';
import { MainserviceService } from '../mainservice.service';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';


export class ValidarMaestro {
  static createValidator(_mainsService: MainserviceService) {
    return (control: AbstractControl) => {
        
        return _mainsService.getMaestro(control.value)
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