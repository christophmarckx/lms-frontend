import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'processError',
  standalone: true
})
export class ProcessErrorPipe implements PipeTransform {
  transform(errors: Object): string {
    let message: string = "";
    Object.entries(errors).forEach(([key, value]) => {
      message += `<p>${value}</p>`
    })
    return message;
  }
}
