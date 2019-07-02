import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import {MatSelectModule, MatCardModule, MatTableModule, MatPaginatorModule, MatDialogModule, MatToolbarModule, MatCheckboxChange, MatCheckboxModule} from '@angular/material';
@NgModule({
    declarations: [

    ],
    imports: [
        
    ],
    providers: [MatButtonModule, MatInputModule , MatFormFieldModule,
       MatOptionModule,MatSelectModule, MatCardModule, MatTableModule, MatPaginatorModule,
        MatDialogModule, MatToolbarModule, MatCheckboxModule],
    bootstrap: [],
    exports: [MatButtonModule, MatInputModule, MatFormFieldModule,
       MatOptionModule,MatSelectModule, MatCardModule, MatTableModule, MatPaginatorModule, 
       MatDialogModule, MatToolbarModule, MatCheckboxModule]
  })
export class MaterialModule{}