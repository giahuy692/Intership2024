import { Injectable } from '@angular/core';
import { DTOConfig, DTOResponse, PS_CommonService, Ps_UtilObjectService } from 'src/app/p-lib';
import { PurApiConfigService } from './pur-api-config.service';
import { State, toDataSourceRequest } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { DTOCFFolder } from 'src/app/p-app/p-layout/dto/DTOCFFolder.dto';
import { DTOPromotionImage } from 'src/app/p-app/p-marketing/shared/dto/DTOPromotionProduct.dto';
import { DTONewProductProposal } from '../dto/DTONewProductProposal.dto';

@Injectable({
  providedIn: 'root'
})
export class PurNewGiftServiceService {

  constructor(
    public api: PS_CommonService,
    public config: PurApiConfigService,
  ) { }

  /**
   * API Lấy danh sách quà tặng
   * @param filter kendo filter
   * @returns DTOResponse
   */
  GetListGift(filter: State) {
    let that = this;
    return new Observable<DTOResponse>((obs) => {
      that.api
        .connect(
          that.config.getAPIList().GetListGift.method,
          that.config.getAPIList().GetListGift.url,
          JSON.stringify(toDataSourceRequest(filter))
        )
        .subscribe(
          (res: any) => {
            obs.next(res);
            obs.complete();
          },
          (errors) => {
            obs.error(errors);
            obs.complete();
          }
        );
    });
  }

  /**
   * API lấy thông tin quà tặng
   * @param DTO DTONewProductProposal
   * @returns 
   */
  GetGift(DTO: DTONewProductProposal) {
    let that = this;
    return new Observable<DTOResponse>((obs) => {
      that.api
        .connect(
          that.config.getAPIList().GetGift.method,
          that.config.getAPIList().GetGift.url,
          JSON.stringify(DTO)
        )
        .subscribe(
          (res: any) => {
            obs.next(res);
            obs.complete();
          },
          (errors) => {
            obs.error(errors);
            obs.complete();
          }
        );
    });
  }

  /**
* API Import Template
* @param data
* @returns
*/
  ImportExcelGift(file: File) {
    let that = this;
    const form = new FormData();
    form.append('File', file);

    const headers = new HttpHeaders().append(
      'Company',
      DTOConfig.cache.companyid
    );

    return new Observable<DTOResponse>((obs) => {
      that.api
        .connect(
          that.config.getAPIList().ImportExcelGift.method,
          that.config.getAPIList().ImportExcelGift.url,
          form,
          headers
        )
        .subscribe(
          (res: any) => {
            obs.next(res);
            obs.complete();
          },
          (errors) => {
            obs.error(errors);
            obs.complete();
          }
        );
    });
  }

  /**
    * API Cập nhật trạng thái quà tặng
    * @param listDTO Danh sách quà tặng cần cập nhật
    * @returns
    */
  UpdateGiftStatus(listDTO: DTONewProductProposal[], reqStatus: number) {
    let that = this;
    let param = {
      ListDTO: listDTO,
      StatusID: reqStatus,
    };
    return new Observable<DTOResponse>((obs) => {
      that.api
        .connect(
          that.config.getAPIList().UpdateGiftStatus.method,
          that.config.getAPIList().UpdateGiftStatus.url,
          JSON.stringify(param)
        )
        .subscribe(
          (res: any) => {
            obs.next(res);
            obs.complete();
          },
          (errors) => {
            obs.error(errors);
            obs.complete();
          }
        );
    });
  }

  /**
  * API Cập nhật đề xuất quà tặng
  * @returns
  */
  UpdateGift(DTO: DTONewProductProposal, Properties: string[]) {
    let that = this;
    let param = {
      DTO: DTO,
      Properties: Properties,
    };
    return new Observable<DTOResponse>((obs) => {
      that.api
        .connect(
          that.config.getAPIList().UpdateGift.method,
          that.config.getAPIList().UpdateGift.url,
          JSON.stringify(param)
        )
        .subscribe(
          (res: any) => {
            obs.next(res);
            obs.complete();
          },
          (errors) => {
            obs.error(errors);
            obs.complete();
          }
        );
    });
  }

  /**
     * API xoá đề suất quà tặng
     * @param listDTO danh sách quà tặng cần xoá
     * @returns
     */
  DeleteGift(listDTO: DTONewProductProposal[]) {
    let that = this;
    return new Observable<DTOResponse>((obs) => {
      that.api
        .connect(
          that.config.getAPIList().DeleteGift.method,
          that.config.getAPIList().DeleteGift.url,
          JSON.stringify(listDTO)
        )
        .subscribe(
          (res: any) => {
            obs.next(res);
            obs.complete();
          },
          (errors) => {
            obs.error(errors);
            obs.complete();
          }
        );
    });
  }

  /**
   * API lấy thư mục chứa ảnh sản phẩm
   * @param childPath lấy thư mục con
   * @param id enum lấy folder ảnh, nếu sản phẩm là 7
   * @returns 
   */
  GetFolderWithFile(childPath: string = '', id: number) {
    let that = this;
    //nếu có id > 0 thì get folder root, nếu có path thì get folder con
    let param = {
      'ID': Ps_UtilObjectService.hasValueString(childPath) ? 0 : id,//news = 8
      'Folder': childPath
    }

    return new Observable<DTOCFFolder>(obs => {
      that.api.connect(that.config.getAPIList().GetFolderWithFile.method,
        that.config.getAPIList().GetFolderWithFile.url, JSON.stringify(param)).subscribe(
          (res: DTOCFFolder) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          }
        )
    });
  }


  /**
   * Cập nhật hình ảnh sản phẩm
   * @param dto :DTOPromotionImage
   * @returns
   */
  UpdateProductImage(dto: DTOPromotionImage) {
    let that = this;
    //   var param: DTOUpdate = {
    //     DTO: dto,
    //     Properties: prop,
    // }
    return new Observable<DTOResponse>(obs => {
      that.api.connect(that.config.getAPIList().UpdateProductImage.method,
        that.config.getAPIList().UpdateProductImage.url,
        JSON.stringify(dto)).subscribe(
          (res: any) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          }
        )
    })
  }

  /**
 * Xóa hình ảnh sản phẩm
 * @param dto :DTOPromotionImage
 * @returns
 */
  DeleteProductImage(dto: DTOPromotionImage) {
    let that = this;
    return new Observable<DTOResponse>(obs => {
      that.api.connect(that.config.getAPIList().DeleteProductImage.method,
        that.config.getAPIList().DeleteProductImage.url,
        JSON.stringify(dto)).subscribe(
          (res: any) => {
            obs.next(res);
            obs.complete();
          }, errors => {
            obs.error(errors);
            obs.complete();
          }
        )
    })
  }

/**
 * Lấy danh sách khai quan
 * @param filter filter
 */
  GetListTax(filter: State) {
    let that = this;
    return new Observable<DTOResponse>(obs => {
      this.api.connect(
        that.config.getAPIList().GetListTax.method,
        that.config.getAPIList().GetListTax.url,
        JSON.stringify(toDataSourceRequest(filter))
      ).subscribe(
        (res: DTOResponse) => {
          obs.next(res);
          obs.complete();
        }, errors => {
          obs.error(errors);
          obs.complete();
        }
      )
    });
  }
}
