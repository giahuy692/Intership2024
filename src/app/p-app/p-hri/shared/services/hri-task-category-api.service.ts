import { Injectable } from '@angular/core';
import { DTOResponse, PS_CommonService, Ps_UtilCacheService } from 'src/app/p-lib';
import { HriApiConfigService } from './hri-api-config.service';
import { State, toDataSourceRequest } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import { DTOHRLSTask } from '../dto/DTOHRTaskCategory.dto';

@Injectable({
  providedIn: 'root'
})
export class HriTaskCategoryApiService {


  constructor(
    public api: PS_CommonService,
    public taskCategoryConfig: HriApiConfigService,
    public cacheService: Ps_UtilCacheService
  ) { }


  /**
   * API Lấy danh sách thông tin đầu việc
   * @param filter kendo filter
   * @returns DTOResponse
   */
  GetListHRLSTask(filter: State) {
    let that = this;
    let param = {
      Filter: toDataSourceRequest(filter),
    };
    return new Observable<DTOResponse>((obs) => {
      that.api
        .connect(
          that.taskCategoryConfig.getAPIList().GetListHRLSTask.method,
          that.taskCategoryConfig.getAPIList().GetListHRLSTask.url,
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
   * API cập nhật đầu công việc
   * @param DTO 
   * @returns 
   */
  UpdateHRLSTask(DTO: DTOHRLSTask) {
    let that = this;
    return new Observable<DTOResponse>(obs => {
      that.api.connect(
        that.taskCategoryConfig.getAPIList().UpdateHRLSTask.method,
        that.taskCategoryConfig.getAPIList().UpdateHRLSTask.url,
        JSON.stringify(DTO)).subscribe(
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

  /**
   * API xoá đầu việc
   * @param listDTO danh sách đầu việc cần xoá
   * @returns
   */
  DeleteHRLSTask(listDTO: DTOHRLSTask[]) {
    let that = this;
    return new Observable<DTOResponse>((obs) => {
      that.api
        .connect(
          that.taskCategoryConfig.getAPIList().DeleteHRLSTask.method,
          that.taskCategoryConfig.getAPIList().DeleteHRLSTask.url,
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
   * API Cập nhật trạng thái của đầu việc
   * @param listDTO Danh sách đầu việc cần cập nhật
   * @param reqStatus Trạng thái muốn chuyển sang
   * @returns
   */
  UpdateHRLSTaskStatus(listDTO: DTOHRLSTask[], reqStatus: number) {
    let that = this;
    let param = {
      ListDTO: listDTO,
      Status: reqStatus,
    };
    return new Observable<DTOResponse>((obs) => {
      that.api
        .connect(
          that.taskCategoryConfig.getAPIList().UpdateHRLSTaskStatus.method,
          that.taskCategoryConfig.getAPIList().UpdateHRLSTaskStatus.url,
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


}
