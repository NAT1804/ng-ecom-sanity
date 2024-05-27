import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ListCardComponent } from '@components/common/list-card/list-card.component';
import { SanityService } from '@services/sanity/sanity.service';
import { Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'nat-managemnet-categories',
  standalone: true,
  imports: [CommonModule, ListCardComponent],
  templateUrl: './managemnet-categories.component.html',
  styleUrl: './managemnet-categories.component.less',
})
export class ManagemnetCategoriesComponent implements OnInit, OnDestroy {
  private activedRoute = inject(ActivatedRoute);
  private sanityService = inject(SanityService);
  public data: any;
  private _subs: Subscription;

  constructor() {
    this._subs = new Subscription();
  }

  ngOnDestroy(): void {
    this._subs?.unsubscribe();
  }

  ngOnInit(): void {
    const sub = this.activedRoute.queryParams.pipe(switchMap((param: Params) => {
      return this.sanityService.getProductsOfSpecificCategory(param['s'])
    })).subscribe((data) => {
      this.data = data;
    })
    this._subs.add(sub);
  }
}
