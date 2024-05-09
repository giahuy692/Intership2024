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
        Name: 'daudhahdoahdahdaljdaldhaldhaldaljbckhabvaihgcaousdh adhuahdkadakdadhadaldjaljdlajdlajdaldja',
        Brand: 'Brand01',
        Origin: 'Origin01',
        Price: 15000000,
        Quantity: 3,
      },
      {
        Barcode: '0002',
        Name: 'daudhahdoahdahdaljdaldhaldhaldaljbckhabvaihgcaousdh adhuahdkadakdadhadaldjaljdlajdlajdaldja',
        Brand: 'Brand01',
        Origin: 'Origin01',
        Price: 15,
        Quantity: 3,
      },{
        Barcode: '0003',
        Name: 'daudhahdoahdahdaljdaldhaldhaldaljbckhabvaihgcaousdh adhuahdkadakdadhadaldjaljdlajdlajdaldja',
        Brand: 'Brand01',
        Origin: 'Origin01',
        Price: 15,
        Quantity: 3,
      },{
        Barcode: '0004',
        Name: 'daudhahdoahdahdaljdaldhaldhaldaljbckhabvaihgcaousdh adhuahdkadakdadhadaldjaljdlajdlajdaldja',
        Brand: 'Brand01',
        Origin: 'Origin01',
        Price: 15,
        Quantity: 3,
      },{
        Barcode: '0005',
        Name: 'daudhahdoahdahdaljdaldhaldhaldaljbckhabvaihgcaousdh adhuahdkadakdadhadaldjaljdlajdlajdaldja',
        Brand: 'Brand01',
        Origin: 'Origin01',
        Price: 15,
        Quantity: 3,
      },{
        Barcode: '0006',
        Name: 'daudhahdoahdahdaljdaldhaldhaldaljbckhabvaihgcaousdh adhuahdkadakdadhadaldjaljdlajdlajdaldja',
        Brand: 'Brand01',
        Origin: 'Origin01',
        Price: 15,
        Quantity: 3,
      },
    ],
    State:'Ngưng hiển thị'
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
