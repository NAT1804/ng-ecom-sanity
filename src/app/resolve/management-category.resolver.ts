import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { SanityService } from '@services/sanity/sanity.service';

export const managementCategoryResolver: ResolveFn<boolean> = (
  route,
  state
) => {
  const sanityService = inject(SanityService);
  return sanityService.getProductsOfSpecificCategory(route.params['slug']);
};
