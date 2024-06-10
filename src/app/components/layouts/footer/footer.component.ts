import {
  ChangeDetectionStrategy,
  Component,
  Input,
  input,
} from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFooterComponent } from 'ng-zorro-antd/layout';
import { ThemeSelectorComponent } from '@components/common/theme-selector/theme-selector.component';

@Component({
  selector: 'nat-footer',
  standalone: true,
  imports: [
    NzFooterComponent,
    NzIconModule,
    NzGridModule,
    ThemeSelectorComponent,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  storeInfor = input<any>();

  constructor() {}

  handleCall() {
    window.open(`tel:${this.storeInfor()?.hotline}`);
  }

  handleOpenZalo() {
    window.open(this.storeInfor()?.linkZalo, '_blank');
  }

  handleOpenFacebook() {
    window.open(this.storeInfor()?.linkFacebook, '_blank');
  }

  handleTextSMS() {
    window.open(`sms:${this.storeInfor()?.hotline}`);
  }

  handleThemChange(theme: string) {
    console.log('current theme:', theme);
  }
}
