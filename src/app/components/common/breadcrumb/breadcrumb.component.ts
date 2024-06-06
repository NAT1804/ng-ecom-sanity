import { CommonModule } from '@angular/common';
import { Component, model } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IBreadcrumb } from '@models/breadcrumb.model';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

@Component({
  selector: 'nat-breadcrumb',
  standalone: true,
  imports: [CommonModule, NzBreadCrumbModule, RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.less',
})
export class BreadcrumbComponent {
  data = model<IBreadcrumb[]>([]);
  // data = [
  //   {
  //     label: 'Trang chủ',
  //     link: ['/home'],
  //   },
  // ];

  constructor() {}
}
