import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of} from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { DTOSupplier } from "../dtos/DTOSupplier.dto";
import { DTOItemOrder } from "../dtos/DTOItemOrder.dto";

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
    private supplierUrl = 'api/suppliers';
    private orderUrl = 'api/orders';

    constructor(private http: HttpClient) {}

    getPurchases(): Observable<DTOSupplier[]> {
        return this.http.get<DTOSupplier[]>(this.supplierUrl)
        .pipe(
            tap(_ => this.log('fetched heroes')),
            catchError(this.handleError<DTOSupplier[]>('getPurchase', []))
        );
    }

    getOrders(): Observable<DTOItemOrder[]> {
        return this.http.get<DTOItemOrder[]>(this.orderUrl)
        .pipe(
            tap(_ => this.log('fetched orders')),
            catchError(this.handleError<DTOItemOrder[]>('getOrders', []))
        );
    }


    private log(message: string) {
        console.log(`PurchaseService: ${message}`);
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
        console.error(error);
        this.log(`${operation} failed: ${error.message}`);
        return of(result as T);
        };
    }
}
