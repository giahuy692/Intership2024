import { State } from "@progress/kendo-data-query";

export class DTODashboard {
  Code: number = 0;
  ChartType: number;
  ChartTypeName: string = "";
  ChartValue: number = 0;
  Percentage: number = 0;
  ChartTitle: string = "";
  ListData: DTODashboard[] = [];
  Total?: number = 0; // Tổng số nhân viên
  Recruitment?: number = 0; // Tuyển dụng
  Leave?: number = 0; // Nghỉ việc
  Reassignment?: number = 0; // Chuyển công tác
  NotOfficial?: number = 0; // Chưa chính thức
  Official?: number = 0; // Chính thức
  BirthDate?: number = 0; // Sinh nhật
  Filter?: State = null; // Lọc dữ liệu
  GroupBy?: string = ""; // Nhóm dữ liệu (Group theo năm || tháng || ngày)

  constructor(ChartType: number) {
    this.ChartType = ChartType;
  }
}