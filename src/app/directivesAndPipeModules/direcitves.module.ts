import { AsideDirective } from './directives/aside.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricePipePipe } from './Pipes/price-pipe.pipe';

@NgModule({
  declarations: [AsideDirective, PricePipePipe],
  imports: [CommonModule],
  exports: [AsideDirective, PricePipePipe],
})
export class DirecitvesModule {}
