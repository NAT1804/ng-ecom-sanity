import { Pipe, PipeTransform, input } from '@angular/core';

@Pipe({
  name: 'phoneFormat',
  standalone: true,
})
export class PhoneFormatPipe implements PipeTransform {
  transform(inputVal: string, ...args: unknown[]): string {
    let ans = '';
    if (!inputVal) return ans;

    const areaCodeStr = inputVal.slice(0, 3);
    const midSectionStr = inputVal.slice(3, 6);
    const lastSectionStr = inputVal.slice(6, 10);

    ans = `${areaCodeStr}.${midSectionStr}.${lastSectionStr}`;
    return ans;
  }
}
