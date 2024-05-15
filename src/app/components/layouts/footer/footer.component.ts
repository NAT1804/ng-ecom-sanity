import { Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFooterComponent } from 'ng-zorro-antd/layout';

@Component({
  selector: 'nat-footer',
  standalone: true,
  imports: [NzFooterComponent, NzIconModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.less'
})
export class FooterComponent {

}
