import { ErrorHandler, Injectable } from '@angular/core';
import { Ps_UtilObjectService } from './p-lib';

@Injectable()
export class AppErrorHandler implements ErrorHandler {
    curError = null
    //Hàm dùng để alert lỗi để dev biết lỗi khi user dùng các thiết bị, trình duyệt, hệ điều hành,...
    handleError(error: any): void {
        console.error(`Phần mềm bị lỗi: `, error);
        var str = JSON.stringify(error)

        if (Ps_UtilObjectService.hasValue(error) && str != '{}'
            && !str.includes('Unknown') && !str.includes('unsub') && this.curError != error) {
            this.curError = error
            alert(`Phần mềm bị lỗi: ${str}`)
        }
        //Vào https://evanw.github.io/source-map-visualization/
        //Up file source map theo lỗi báo, dò theo row và column
    }
}
