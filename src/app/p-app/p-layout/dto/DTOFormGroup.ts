import { FormControl } from '@angular/forms';

export type DTOFormGroup<T> = {
  [K in keyof T]: FormControl<T[K]>;
};