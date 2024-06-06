import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createClient, ClientConfig, SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

import { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

import { environment } from '@environments/environment';
import { IProduct } from '@models/product.model';
import { Observable, from, tap } from 'rxjs';
import { ICategory } from '@models/category.model';
import {
  IBaseResponse,
  IResponseProductsByCategory,
} from '@models/base-response.model';
import { IBanner } from '@models/banner.model';

@Injectable({
  providedIn: 'root',
})
export class SanityService {
  private client: SanityClient;
  private imageUrlBuilder: ImageUrlBuilder;
  private clientConfig: ClientConfig = {
    projectId: environment.sanity.projectId,
    dataset: environment.sanity.dataset,
    apiVersion: environment.sanity.apiVersion,
    useCdn: environment.sanity.useCdn,
  };
  constructor(private http: HttpClient) {
    this.client = this.sanityClient();
    this.imageUrlBuilder = imageUrlBuilder(this.client);
  }
  private sanityClient(): SanityClient {
    return createClient(this.clientConfig);
  }

  getImageUrlBuilder(source: SanityImageSource): ImageUrlBuilder {
    return this.imageUrlBuilder.image(source);
  }

  getAllProducts(): Observable<IProduct[]> {
    return from(
      this.sanityClient().fetch('*[_type == "product"]|order(_createdAt desc)')
    );
  }

  getAllCategories(): Observable<ICategory[]> {
    return from(
      this.sanityClient().fetch('*[_type == "category"]|order(_createdAt desc)')
    );
  }

  getStoreInformation(): Observable<any> {
    return from(this.sanityClient().fetch('*[_type == "storeInfor"][0]'));
  }

  getAllBanners(): Observable<IBanner[]> {
    return from(
      this.sanityClient().fetch('*[_type == "banner"]|order(_createdAt desc)')
    );
  }

  getProductsOfAllCategory(): Observable<IResponseProductsByCategory[]> {
    return from(
      this.sanityClient().fetch(
        `*[_type == "category"]{
        _id,
        title,
        "products": *[_type == "product" && references(^._id)]
      }`
      )
    );
  }

  getDetailProduct(slug: string): Observable<any> {
    return from(
      this.sanityClient().fetch(
        `*[_type == "product" && slug.current == $slug][0]{
        ...,
        "categories": *[_type == "category" && _id in ^.categories[]._ref]{
          title,
          slug
        }
        }`,
        { slug }
      )
    );
  }

  getProductsOfSpecificCategory(slug: string): Observable<any> {
    return from(
      this.sanityClient().fetch(
        `*[_type == "category" && slug.current == $slug][0]{
        _id,
        title,
        slug,
        "products": *[_type == "product" && references(^._id)]
      }`,
        { slug }
      )
    );
  }

  searchProducts(searchText: string): Observable<any> {
    return from(
      this.sanityClient().fetch(
        `*[_type == "product" && (title match $searchText || body match $searchText)]{
          ...,
          "categories": *[_type == "category" && _id in ^.categories[]._ref]{
            title,
            slug
          }
        }`,
        { searchText }
      )
    );
  }
}
