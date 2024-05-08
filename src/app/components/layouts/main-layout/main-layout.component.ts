import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

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
    NzBreadCrumbModule
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.less',
})
export class MainLayoutComponent {}
