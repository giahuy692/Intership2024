import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DTOHamper } from '../dtos/DTOHamper.dto';
import { DTOProduct } from '../dtos/DTOProduct.dto';

@Injectable({
  providedIn: 'root',
})
export class HamperService {
  //Hamber subject, subscribe hamberSubject$ to assign the change of hamber
  hamberDummy?: DTOHamper = {
    ProductList: [
      {
        Barcode: '0001',
        Name: 'Product01',
        Brand: 'Brand01',
        Origin: 'Origin01',
        Price: 15,
        Quantity: 3,
      },
      {
        Barcode: '0001',
        Name: 'Product01',
        Brand: 'Brand01',
        Origin: 'Origin01',
        Price: 15,
        Quantity: 3,
      },
      {
        Barcode: '0001',
        Name: 'Product01',
        Brand: 'Brand01',
        Origin: 'Origin01',
        Price: 15,
        Quantity: 3,
      },
      {
        Barcode: '0001',
        Name: 'Product01',
        Brand: 'Brand01',
        Origin: 'Origin01',
        Price: 15,
        Quantity: 3,
      },
    ],
  };
  private hamberSubject = new BehaviorSubject<DTOHamper>(this.hamberDummy);
  hamberSubject$: Observable<DTOHamper> = this.hamberSubject.asObservable();
  constructor() {}
  addProduct(pro: DTOProduct) {
    let hamberClone: DTOHamper;
    this.hamberSubject$.subscribe((data) => (hamberClone = data));
    hamberClone.ProductList.push(pro);
    this.hamberSubject.next(hamberClone);
  }
}
