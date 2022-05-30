import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { MaterialModule } from './material.module';


@NgModule({
  declarations: [ // recursos que fazem parete do módulo (componentes, pipes, diretivas)
    LoaderComponent
  ],
  imports: [CommonModule, MaterialModule],
  exports: [LoaderComponent],
})
export class SharedModule {}

/*
* O uso do shared se destoma a armazenar recursos usados com frequência
* por outras partes da aplicação: pipes, diretivas, componentes
*/