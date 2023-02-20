import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notFoundPipe'
})
export class PricePipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {

    if(!Boolean(value)) value="Not Found"
    return value;
  }

}
