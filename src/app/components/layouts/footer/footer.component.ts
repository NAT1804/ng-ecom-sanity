import {
  ChangeDetectionStrategy,
  Component,
  Input,
  input,
} from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzFooterComponent } from 'ng-zorro-antd/layout';

@Component({
  selector: 'nat-footer',
  standalone: true,
  imports: [NzFooterComponent, NzIconModule, NzGridModule],
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
}
