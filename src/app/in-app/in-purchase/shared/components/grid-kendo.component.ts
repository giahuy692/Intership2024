import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-grid-kendo-component',
  template: `
    <kendo-grid
      [kendoGridBinding]="data"
      [resizable]="true"
      [reorderable]="true"
      [selectable]="{ checkboxOnly: true, mode: 'multiple' }"
      [(selectedKeys)]="selectedKeys"
      [kendoGridSelectBy]="'id'"
      (selectionChange)="onSelectionChange($event)"
      class="custom-grid"
    >
      <!-- Checkbox column -->
      <kendo-grid-checkbox-column [width]="40" [showSelectAll]="true"></kendo-grid-checkbox-column>

      <!-- Data columns -->
      <kendo-grid-column
        *ngFor="let col of columns"
        [field]="col.field"
        [title]="col.title"
        [width]="col.width"
      >
        <ng-template kendoGridCellTemplate let-dataItem>
          <ng-container *ngIf="col.template; else defaultTemplate">
            <ng-container
              [ngTemplateOutlet]="col.template"
              [ngTemplateOutletContext]="{ $implicit: dataItem }"
            ></ng-container>
          </ng-container>
          <ng-template #defaultTemplate>
            {{ dataItem[col.field] }}
          </ng-template>
        </ng-template>
      </kendo-grid-column>

      <!-- Action column with menu -->
      <kendo-grid-column [width]="60">
        <ng-template kendoGridCellTemplate let-dataItem>
          <kendo-dropdownbutton
            icon="more-vertical"
            look="flat"
            [data]="menuItems"
            (itemClick)="onMenuAction($event, dataItem)"
          >
          </kendo-dropdownbutton>
        </ng-template>
      </kendo-grid-column>
    </kendo-grid>
  `,
  styles: [`
    ::ng-deep .k-grid-header {
      background-color: #FFFFFF;
      font-weight: bold;
    }
    ::ng-deep .k-grid th {
      vertical-align: top;
      padding: 40px;
      color: #6d7488ff;
      background-color: #f3f5fcff;
      border: none !important;
    }
    ::ng-deep .k-grid td {
      border: none !important;
    }
    ::ng-deep .k-dropdown-button {
      padding: 0;
      min-width: 0;
    }
    ::ng-deep .k-menu-item-icon {
      opacity: 0.6;
    }
  `]
})
export class GridKendoComponent {
  @Input() data: any[] = [];
  @Input() columns: {
    field: string;
    title: string;
    width?: number;
    template?: TemplateRef<any>;
  }[] = [];

  public selectedKeys: any[] = [];

  public menuItems = [
    { text: 'Chỉnh sửa', icon: 'edit', id: 'edit' },
    { text: 'Duyệt', icon: 'edit', id: 'approve' },
    { text: 'Không duyệt', icon: 'edit', id: 'reject' },
    { text: 'Xóa sản phẩm', icon: 'delete', id: 'delete' }
  ];

  onSelectionChange(event: any): void {
    const selected = event.selectedRows.map((r: any) => r.dataItem.id);
    const deselected = event.deselectedRows.map((r: any) => r.dataItem.id);

    this.selectedKeys = this.selectedKeys
      .filter(id => !deselected.includes(id))
      .concat(selected.filter((id: number) => !this.selectedKeys.includes(id)));
  }

  onMenuAction(event: any, item: any): void {
    switch (event.item.id) {
      case 'edit':
        this.editItem(item);
        break;
      case 'approve':
        this.approveItem(item);
        break;
      case 'reject':
        this.rejectItem(item);
        break;
      case 'delete':
        this.deleteItem(item);
        break;
    }
  }

  editItem(item: any) {
    console.log('Chỉnh sửa:', item);
  }

  approveItem(item: any) {
    console.log('Duyệt:', item);
  }

  rejectItem(item: any) {
    console.log('Không duyệt:', item);
  }

  deleteItem(item: any) {
    console.log('Xóa sản phẩm:', item);
  }
}
