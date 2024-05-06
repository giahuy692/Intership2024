import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DTOHamber } from '../dtos/DTOHamber.dto';

@Injectable({
  providedIn: 'root'
})
export class HamberService {
  //Hamber subject, subscribe hamberSubject$ to assign the change of hamber 
  hamberDummy?: DTOHamber 
  private hamberSubject = new BehaviorSubject<DTOHamber>(this.hamberDummy)
  hamberSubject$: Observable<DTOHamber> = this.hamberSubject.asObservable();
  constructor() { }
}
