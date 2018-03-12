import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import { IProduct } from './product';

@Injectable()
export class ProductService {

  private _productUrl = './api/products/product.json';

constructor(private _http: HttpClient) { }

  getProducts(): Observable<IProduct[]>  {
    return this._http.get<IProduct[]>(this._productUrl)
            .catch(this.handlerError);
  }

  getProduct(id: number): Observable<IProduct> {
    return this.getProducts()
    .map((products: IProduct[]) => products.find(p => p.productId === id));
  }

  private handlerError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof Error) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code ${err.status}, error message is: ${err.message} `;
    }
    console.log(err.message);
    return Observable.throw(err.message);
  }
}
