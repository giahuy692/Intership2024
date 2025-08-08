import { Injectable } from '@angular/core';
import { DTOConfig, DTOResponse, PS_CommonService, Ps_UtilObjectService } from 'src/app/p-lib';
import { PurApiConfigService } from './pur-api-config.service';
import { State, toDataSourceRequest } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import { DTONewProductProposal } from '../dto/DTONewProductProposal.dto';
import { HttpHeaders } from '@angular/common/http';
import { DTOPromotionImage } from "../../../p-marketing/shared/dto/DTOPromotionProduct.dto";
import { DTOCFFolder } from "../../../p-layout/dto/DTOCFFolder.dto";

@Injectable({
  providedIn: 'root'
})
export class PurNewProductProposalService {
  constructor(
    public api: PS_CommonService,
    public config: PurApiConfigService,
  ) { }

  /**
   * API Lấy danh sách thông đề xuất hàng mới
   * @param filter kendo filter
   * @returns DTOResponse
   */
  GetListNewProductProposal(filter: State) {
    let that = this;
    return new Observable<DTOResponse>((obs) => {
      that.api
        .connect(
          that.config.getAPIList().GetListNewProductProposal.method,
          that.config.getAPIList().GetListNewProductProposal.url,
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

  GetNewProductProposal(DTO: DTONewProductProposal) {
    let that = this;
    return new Observable<DTOResponse>((obs) => {
      that.api
        .connect(
          that.config.getAPIList().GetNewProductProposal.method,
          that.config.getAPIList().GetNewProductProposal.url,
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
    * API Cập nhật trạng thái đề xuất sản phẩm
    * @param listDTO Danh sách sản phẩm cần cập nhật
    * @returns
    */
  UpdateNewProductProposalStatus(listDTO: DTONewProductProposal[], reqStatus: number) {
    let that = this;
    let param = {
      ListDTO: listDTO,
      StatusID: reqStatus,
    };
    return new Observable<DTOResponse>((obs) => {
      that.api
        .connect(
          that.config.getAPIList().UpdateNewProductProposalStatus.method,
          that.config.getAPIList().UpdateNewProductProposalStatus.url,
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
  * API Cập nhật đề xuất sản phẩm
  * @returns
  */
  UpdateNewProductProposal(DTO: DTONewProductProposal, Properties: string[]) {
    let that = this;
    let param = {
      DTO: DTO,
      Properties: Properties,
    };
    return new Observable<DTOResponse>((obs) => {
      that.api
        .connect(
          that.config.getAPIList().UpdateNewProductProposal.method,
          that.config.getAPIList().UpdateNewProductProposal.url,
          JSON.stringify(param, (k, v) => { return Ps_UtilObjectService.parseDateToString(k, v, ['POFrom', 'POTo', 'StoreFrom', 'StoreTo']) })).subscribe(
            (res: any) => {
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
     * API xoá đề suất sản phẩm
     * @param listDTO danh sách đề suất sản phẩm cần xoá
     * @returns
     */
  DeleteNewProductProposal(listDTO: DTONewProductProposal[]) {
    let that = this;
    return new Observable<DTOResponse>((obs) => {
      that.api
        .connect(
          that.config.getAPIList().DeleteNewProductProposal.method,
          that.config.getAPIList().DeleteNewProductProposal.url,
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
* API Import Template
* @param data
* @returns
*/
  ImportExcelNewProductProposal(file: File) {
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
          that.config.getAPIList().ImportExcelNewProductProposal.method,
          that.config.getAPIList().ImportExcelNewProductProposal.url,
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
   * API lấy foler ảnh
   * @returns 
   */
  GetPromotionFolderDrillWithFile() {
    let that = this;
    return new Observable<DTOCFFolder>(obs => {
      that.api.connect(that.config.getAPIList().GetPromotionFolderDrillWithFile.method,
        'http://172.16.10.251:89/api/res/GetPromotionFolderDrillWithFile', {}).subscribe(
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
