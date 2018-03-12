import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {

  pageTitle: 'PRoduct List';
  imageWidth: 20;
  imageMargin: 2;
  showImage = false;
  errorMessage;

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filterProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  filterProducts: IProduct[];

  products: IProduct[] = [];

constructor(private _productService: ProductService) {


}

OnRatingClicked(message): void {
  this.pageTitle = message;
}
performFilter(filterBy: string): IProduct[] {
  filterBy = filterBy.toLocaleLowerCase();
  return this.products.filter((product: IProduct) =>
      product.productName.toLowerCase().indexOf(filterBy) !== -1);
}

  toogleImage(): void {
        this.showImage = !this.showImage;
      }

      ngOnInit(): void {
        this._productService.getProducts()
            .subscribe(products => {
              this.products = products;
              this.filterProducts = this.products;
              console.log(this.filterProducts.length);
            },
            error => this.errorMessage = <any>error);
      console.log('TEST ETS ');

      }

}
