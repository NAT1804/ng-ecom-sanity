import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { ThemeSelectorComponent } from '@components/common/theme-selector/theme-selector.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzHeaderComponent } from 'ng-zorro-antd/layout';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { SanityService } from '@services/sanity/sanity.service';
import { Router } from '@angular/router';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { PhoneFormatPipe } from '@pipes/phone-format.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'nat-header',
  standalone: true,
  imports: [
    NzHeaderComponent,
    ThemeSelectorComponent,
    NzGridModule,
    NzInputModule,
    NzButtonModule,
    NzDrawerModule,
    NzMenuModule,
    PhoneFormatPipe,
    FormsModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  storeInfor = input<any>();
  public categories = signal<any[]>([]);
  public visible = signal<boolean>(false);
  private readonly router = inject(Router);
  public searchText = '';

  ngOnInit(): void {}

  public goHome(): void {
    this.router.navigateByUrl('/home');
  }

  public goToPage(slug: any) {
    this.router.navigateByUrl(`/categories?s=${slug.current}`);
  }

  open(): void {
    this.visible.set(true);
  }

  close(): void {
    this.visible.set(false);
  }

  callHotline(phone: string) {
    window.open(`tel:${phone}`);
  }

  handleSearchProduct() {
    if (this.searchText === '') {
      return;
    }
    this.router.navigateByUrl(`/search?s=${this.searchText}`);
  }
}
