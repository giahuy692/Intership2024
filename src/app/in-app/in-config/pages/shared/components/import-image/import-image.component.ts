import { Component, ViewEncapsulation } from '@angular/core';
import { FileRestrictions, SelectEvent } from '@progress/kendo-angular-upload';

type ImagePreview = {
  src: string | ArrayBuffer;
  uid: string;
};

@Component({
  selector: 'app-import-image',
  templateUrl: './import-image.component.html',
  styleUrls: ['./import-image.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ImportImageComponent {
  public events: string[] = [];
  public imagePreview: ImagePreview;

  public fileRestrictions: FileRestrictions = {
    allowedExtensions: [".jpg", ".png"],
  };

  public select(e: SelectEvent){
    this.imagePreview = null;
    const that = this;

    e.files.forEach((file) => {
      if (!file.validationErrors) {
        const reader = new FileReader();

        reader.onload = function (ev) {
          const image: ImagePreview = {
            src: ev.target["result"],
            uid: file.uid,
          };

          that.imagePreview = image;
        };

        reader.readAsDataURL(file.rawFile);
      }
    });
  }

  public delete(){
    this.imagePreview = null;
  }

}
