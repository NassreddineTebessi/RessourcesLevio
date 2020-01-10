import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTableResource'
})
export class FilterTableResourcePipe implements PipeTransform {

  transform(value: any[], word: string): any {
    if (!word) return value;
    return value.filter(data=> {
        return JSON.stringify(data).toLowerCase().includes(word);
      }
    );
  }

  
}
