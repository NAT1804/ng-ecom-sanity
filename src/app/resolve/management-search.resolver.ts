import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { SanityService } from '@services/sanity/sanity.service';

export const managementSearchResolver: ResolveFn<boolean> = (route, state) => {
  const sanityService = inject(SanityService);
  return sanityService.searchProducts(route.queryParams['s']);
};
