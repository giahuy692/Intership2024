
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'ConvertMinuteToString_dd_hh_mm' })

export class ConvertMinuteToString_dd_hh_mm implements PipeTransform {
    transform(inputMinute: number) {
        if (inputMinute != null && inputMinute > 0) {
            let days = Math.floor(inputMinute / 1440);
            let remainingTime = inputMinute - Math.floor((days * 1440));
            let hours = Math.floor(remainingTime / 60);
            let minutes = Math.floor(remainingTime - (hours * 60));

            return (days > 0 ? `${String(days)}d ` : '')
                + (hours > 0 ? `${String(hours)}h ` : '')
                + `${String(minutes)}m`;
        } else {
            return ""; // Default value when input is not valid
        }
    }
}