import { Component, Input } from '@angular/core';
import { ThemeSelectorComponent } from '@components/common/theme-selector/theme-selector.component';
import { NzHeaderComponent } from 'ng-zorro-antd/layout';

@Component({
  selector: 'nat-header',
  standalone: true,
  imports: [NzHeaderComponent, ThemeSelectorComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.less'
})
export class HeaderComponent {
  @Input() storeInfor: any
}
