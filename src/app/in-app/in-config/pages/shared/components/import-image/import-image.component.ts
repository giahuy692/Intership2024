import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { FileRestrictions, SelectEvent } from '@progress/kendo-angular-upload';

type ImagePreview = {
  src: string | ArrayBuffer;
  uid: string;
};

/**
 * Component import image
 * - Only import from folder assets of project
 * - Having 1 input srcImage to transmit 1 src photo
 * - Having 1 output fileSelected to get name image that is imported
 */

@Component({
  selector: 'app-import-image',
  templateUrl: './import-image.component.html',
  styleUrls: ['./import-image.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ImportImageComponent {
  public events: string[] = [];
  public imagePreview: ImagePreview;
  @Output() fileSelected: EventEmitter<string> = new EventEmitter<string>();
  @Input() srcImage: string = '';

  public fileRestrictions: FileRestrictions = {
    allowedExtensions: [".jpg", ".png"],
  };

  public select(e: SelectEvent){
    this.srcImage = '';
    const objectFile = e.files;
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
    
    // Emit the filename to the parent component
    this.fileSelected.emit(objectFile[0].name);
  }


  public delete(){
    this.imagePreview = null;
    this.srcImage = null;
    this.fileSelected.emit('');
  }

}
