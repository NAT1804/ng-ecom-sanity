import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Params,
  Router,
} from '@angular/router';
import { ListCardComponent } from '@components/common/list-card/list-card.component';
import { SanityService } from '@services/sanity/sanity.service';
import { Subscription, filter, switchMap } from 'rxjs';

@Component({
  selector: 'nat-managemnet-categories',
  standalone: true,
  imports: [CommonModule, ListCardComponent],
  templateUrl: './management-categories.component.html',
  styleUrl: './management-categories.component.less',
})
export class ManagementCategoriesComponent implements OnInit, OnDestroy {
  private activedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private sanityService = inject(SanityService);
  public categoryData: any;
  private _subs: Subscription;

  constructor() {
    this._subs = new Subscription();
  }

  ngOnDestroy(): void {
    this._subs?.unsubscribe();
  }

  ngOnInit(): void {
    this.categoryData = this.activedRoute.snapshot.data['categoryData'];

    const routeSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.categoryData = this.activedRoute.snapshot.data['categoryData'];
      }
    });
    this._subs.add(routeSub);
  }
}
