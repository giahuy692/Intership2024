import { Ps_UtilObjectService } from "src/app/p-lib";

export class DTOSYSNotification {
	Order: number;
	Image: string;
	Type: number;
	Status: number = 1;
	Body: string;
	Data: object;
	SentTime: string;
	Title: string;
	Code: number;
	CreatedBy: "SYSTEM"
	CreatedTime: string
	LastModifiedBy?: string
	LastModifiedTime?: string
	Staff: number = null

	// Thêm thuộc tính này để quản lý trạng thái mở rộng của notification 
	// trong list không dùng để cập nhật hay BE trả về dữ liệu này
	isExpanded?: boolean = false; 

	/**
	 * @param noti DTO notification
	 */
	constructor(noti?: DTOSYSNotification) {
		if (Ps_UtilObjectService.hasValue(noti)) {
			Object.assign(this, noti); // Sao chép giá trị từ dto vào instance
			if (Ps_UtilObjectService.hasValue(noti.SentTime)) {
                this.SentTime = new Date(noti.SentTime).toISOString(); // Chuyển EffDate thành ISO string của Date
            } else {
                this.SentTime = null
            }
		}
	  }
  }