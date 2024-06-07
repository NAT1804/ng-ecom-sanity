import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BreadcrumbComponent } from '@components/common/breadcrumb/breadcrumb.component';
import { ListCardComponent } from '@components/common/list-card/list-card.component';
import { IBreadcrumb } from '@models/breadcrumb.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'nat-managemnet-categories',
  standalone: true,
  imports: [CommonModule, ListCardComponent, BreadcrumbComponent],
  templateUrl: './management-categories.component.html',
  styleUrl: './management-categories.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagementCategoriesComponent implements OnInit, OnDestroy {
  private activedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  public categoryData = signal<any>({});
  private _subs: Subscription;
  public breadcrumbData = signal<IBreadcrumb[]>([]);

  constructor() {
    this._subs = new Subscription();
  }

  ngOnDestroy(): void {
    this._subs?.unsubscribe();
  }

  ngOnInit(): void {
    this.categoryData.set(this.activedRoute.snapshot.data['categoryData']);

    this.createBreadcrumbData(this.categoryData);

    const routeSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.categoryData.set(this.activedRoute.snapshot.data['categoryData']);
        this.createBreadcrumbData(this.categoryData);
      }
    });
    this._subs.add(routeSub);
  }

  private createBreadcrumbData(categoryData: any): void {
    // Create breadcrumb data
    this.breadcrumbData.set([
      {
        label: 'Trang chủ',
        link: ['/home'],
      },
      {
        label: categoryData().title,
        link: [],
      },
    ]);
  }
}
