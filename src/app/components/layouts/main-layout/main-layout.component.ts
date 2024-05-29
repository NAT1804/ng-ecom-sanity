import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { ThemeSelectorComponent } from '@components/common/theme-selector/theme-selector.component';
import { SanityService } from '@services/sanity/sanity.service';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzButtonModule } from 'ng-zorro-antd/button';

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
    NzButtonModule
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.less',
})
export class MainLayoutComponent implements OnInit {
  private readonly router = inject(Router);
  categories: any[] = [];
  storeInfor: any
  private sanityService = inject(SanityService);
  visible = false;

  constructor() {}

  ngOnInit(): void {
    this.sanityService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });

    this.sanityService.getStoreInformation().subscribe((data) => {
      this.storeInfor = data;
    });
  }

  public goHome(): void {
    this.router.navigateByUrl('/home');
  }

  public goToPage(slug: any) {
    this.router.navigateByUrl(`/categories?s=${slug.current}`);
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
