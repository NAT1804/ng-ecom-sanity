import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ThemeSelectorComponent } from '@components/common/theme-selector/theme-selector.component';
import { SanityService } from '@services/sanity/sanity.service';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule, NzSiderComponent } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { Observable } from 'rxjs';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    NzLayoutModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    NzMenuModule,
    NzIconModule,
    NzBreadCrumbModule,
    RouterModule,
    ThemeSelectorComponent,
    NzBackTopModule,
    NzDrawerModule,
    NzButtonModule,
    NzGridModule,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent implements OnInit {
  private readonly router = inject(Router);
  public categories = signal<any[]>([]);
  public storeInfor = signal<any>({});
  private sanityService = inject(SanityService);
  public visible = signal<boolean>(false);
  public size$!: Observable<string>;
  @ViewChild('sider', { static: false }) sider!: NzSiderComponent;

  constructor() {}

  ngOnInit(): void {
    this.sanityService.getAllCategories().subscribe((data) => {
      this.categories.set(data);
    });

    this.sanityService.getStoreInformation().subscribe((data) => {
      this.storeInfor.set(data);
    });
  }

  public goHome(): void {
    this.router.navigateByUrl('/home');
    if (this.sider.matchBreakPoint) {
      this.sider.setCollapsed(true);
    }
  }

  public goToPage(slug: any) {
    if (this.sider.matchBreakPoint) {
      this.sider.setCollapsed(true);
    }
  }

  open(): void {
    this.visible.set(true);
  }

  close(): void {
    this.visible.set(false);
  }
}
