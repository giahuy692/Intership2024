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
