import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private baseUrl = environment.QuickMartApiUrl + "/products";
  
  private categoryUrl =  environment.QuickMartApiUrl + "/product-category";

  constructor(private httpClient: HttpClient) { }
// =========================
  getProduct(theProductId: number):Observable<Product>{
    // need to build a url based on product id
    const productUrl = `${this.baseUrl}/${theProductId}`;
    
    return this.httpClient.get<Product>(productUrl);
  }
// -----------------------
  getProductList(theCategoryId:number): Observable<Product[]> {

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;   
    return this.getProducts(searchUrl);
  }
// --------------------------------
  getProductListPaginate(thePage:number,
                         thePageSize: number,
                         theCategoryId:number): Observable<GetResponseProducts> {

    // need to build a url based on category id, page and size
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                        + `&page=${thePage}&size=${thePageSize}`;   
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }
// ---------------------------
  searchProducts(theKeyword:string): Observable<Product[]>{
    //  need to build a url based on the keyword
      const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;   
     
      return this.getProducts(searchUrl);
  
    }

// -------------------------------

searchProductsPaginate(thePage:number,
                      thePageSize: number,
                      theKeyword:string): Observable<GetResponseProducts> {

// need to build a url based on keyword, page and size
const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
                    + `&page=${thePage}&size=${thePageSize}`;   
return this.httpClient.get<GetResponseProducts>(searchUrl);
}

// --------------------------------
  getProductCategories(): Observable<ProductCategory[]> {
   
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }
// ---------------------------------
  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }
}
// ========================================
interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number:number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}