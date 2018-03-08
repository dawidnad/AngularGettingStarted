import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IProduct } from './product';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';

@Injectable()
export class ProductService {

  private _productUrl = './api/products/product.json';

constructor(private _http: HttpClient) {

}

  getProduct(): Observable<IProduct[]>  {
    return this._http.get<IProduct[]>(this._productUrl)
            .do(data => {
              console.log('All: ' + JSON.stringify(data));
            console.log('Data.Length' + data.length);
            })
            .catch(this.handlerError);
  }

  private handlerError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
  }
}
