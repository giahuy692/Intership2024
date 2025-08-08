import { Component, OnInit, OnChanges, AfterViewInit, ViewChild, Input, Output, EventEmitter, forwardRef, SimpleChanges } from '@angular/core';
import { LayoutService } from '../../services/layout.service';
import { Ps_UtilObjectService } from 'src/app/p-lib';
import { DTOCFFile } from '../../dto/DTOCFFolder.dto';
import { DTOEmbedImg, DTOEmbedVideo } from 'src/app/p-app/p-marketing/shared/dto/DTOEmbedVideo.dto';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { EditorComponent, Schema } from '@progress/kendo-angular-editor';
import { mySchema } from "./custom-schema";
import * as $ from 'jquery'
import { DTOProduct } from '../../dto/DTOProduct.dto';
import { DOMSerializer, DOMParser as ProseMirrorDOMParser } from 'prosemirror-model';

@Component({
    selector: 'app-p-kendo-editor',
    templateUrl: './p-kendo-editor.component.html',
    styleUrls: ['./p-kendo-editor.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PKendoEditorComponent),
            multi: true
        }]
})
export class PKendoEditorComponent implements OnInit, OnChanges, AfterViewInit, ControlValueAccessor {
    @ViewChild('myeditor') editorRef: EditorComponent;
    //input
    @Input() content: string = '';
    @Input() disabled: boolean = false;
    @Input() readonly: boolean = false;
    @Input() height: string = '100vh'

    /**
     * index là một input được sửa dụng để phân biết được các editor khác nhau trong một trang
     * Lỗi có thể xảy nếu không khai báo biến này là Cannot read properties of null (reading 'contentDocument')
     * Trong trường hợp trang của bạn có quá nhiều field cần dùng editer thì phải khai báo biến này
     * Nếu không khai báo thì sẽ bị lỗi thêm ảnh cho editor này nhưng ảnh lại xuất hiện ở editor khác
     */
    @Input() index: number = 1;

    //output
    @Output() valueChange = new EventEmitter<string>();
    @Output() saveEvent = new EventEmitter<string>();
    @Output() toggleFolderDialog = new EventEmitter<boolean>()
    @Output() getIndex = new EventEmitter<number>();
    //element
    @ViewChild('myeditor') myeditor: EditorComponent;
    //bool
    isVideoURLdialog = false
    popupShow = false;
    isAddVideo = true
    isAddImg = true
    //vid, img
    videoURLform: UntypedFormGroup
    mySchema: Schema = mySchema;//config cho phép nhúng link youtube

    curVid = null
    curImg = null
    embedVideo = new DTOEmbedVideo()
    embedImg = new DTOEmbedImg()
    //init
    constructor(public layoutService: LayoutService,) {
    }

    onChange = (_: any) => { }
    onTouched = (_: any) => { }

    // Ghi giá trị từ FormControl vào component
    writeValue(valueChange: any): void {
        this.content = valueChange;
        if (Ps_UtilObjectService.hasValueString(valueChange)) {
            this.editorRef.writeValue(valueChange)
        }
    }

    registerOnChange(onChangeFn: any) {
        this.onChange = onChangeFn; // Register the value change callback
    }

    registerOnTouched(onTouchFn: any) {
        this.onTouched = onTouchFn; // Register the touch event callback
    }


    ngOnInit() {
        this.loadVideoForm()
        this.layoutService.setEditor(this, this.index);
    }
    ngOnChanges(changes: SimpleChanges) {
        if (changes['content'] && !changes['content'].isFirstChange()) {
            this.editorRef.writeValue(this.content);
        }

        $(document).ready(function () {
            var colorPicker = $('kendo-colorpicker')
            colorPicker.each(function () {
                var color = $(this).attr('aria-label')
                var input = $(this).children()[0].querySelector('.k-input-inner kendo-icon');
                (input as HTMLElement).style.color = color.includes("#") ? color : 'initial'
            })
        })
    }
    ngAfterViewInit() {
        let that = this
        $(document).ready(function () {
            var iframe = $('.k-editor-content > iframe')
            iframe.each(function () {
                $(this).on('load', function () {
                    var iframeWindow = (this as HTMLIFrameElement).contentWindow;
                    $(iframeWindow).on('blur', function () {
                        if (!that.readonly && !that.disabled) {
                            that.saveContent()
                        }
                    });
                });
            })
        })
    }
    //value change emit
    onEditorValueChange(val) {
        // this.content = val
        this.valueChange.emit(val)
        this.onChange(val); // This emits ngModelChange
    }
    onGetIndex() {
        this.getIndex.emit(this.index);
    }
    saveContent() {
        this.saveEvent.emit(this.content)
    }
    //embed img  
    onUploadImg() {
        this.toggleFolderDialog.emit(true)
        this.onGetIndex();
        this.layoutService.folderDialogOpened = true
    }
    pickFile(e: DTOCFFile, width, height) {
        this.embedImgURL(e, width, height)
        this.layoutService.setFolderDialog(false)
    }
    embedImgURL(e: DTOCFFile, width, height) {
        const imgPath = Ps_UtilObjectService.hasValue(e) ? Ps_UtilObjectService.getImgRes(e?.PathFile) : ''

        if (Ps_UtilObjectService.hasValueString(imgPath)) {
            const that = this
            var time = new Date().valueOf()
            const id = 'img_' + time
            const val = new DTOEmbedImg(id, imgPath, width, height)

            this.embedImg = val

            if (this.isAddImg) {
                const link = `<img id="${id}" src="${imgPath}" alt="${e?.FileName}"
                    width="${width > 0 ? width + 'px' : 'auto'}" height="${height > 0 ? height + 'px' : 'auto'}" ></img>`

                /**
                 * Lỗi Applying a mismatched transaction xuất hiện khi xử lý binding 2 chiều 
                 * bằng cách tách [ngModel] và (ngModelChange) để xử lý nó khiến cho component không 
                 * thể exec('setHTML'
                 */
                this.myeditor.focus();
                this.myeditor.exec('insertText', { text: '#CURSOR#' });
                this.myeditor.exec('setHTML', this.myeditor.value.replace('#CURSOR#', link));
                //todo index sẽ bị undefined sau khi add video mới, xóa vdeio cũ
                // (document.querySelector('.k-editor-content .k-iframe') as HTMLIFrameElement).contentDocument
                //     .querySelector(`img#${id}`).addEventListener('click', function click() {
                //         that.getAnchorImg(this.id)
                //     });
                (document.querySelector(`#editor${this.index} .k-editor-content .k-iframe`) as HTMLIFrameElement).contentDocument
                    .querySelector(`img#${id}`).addEventListener('click', function click() {
                        that.getAnchorImg(this.id);
                    });
                // that.myImgNumber++;
                this.clearImg()
            }
            else {
                that.curImg.src = imgPath
                that.curImg.alt = e?.FileName
                this.curImg.style.height = val.Height
                this.curImg.style.width = val.Width
                const newVal = this.myeditor.value
                this.myeditor.value = newVal
                this.clearImg()
            }
        }
    }
    getAnchorImg(id) {
        const iframe = (document.querySelector('.k-editor-content .k-iframe') as HTMLIFrameElement);

        if (Ps_UtilObjectService.hasValue(iframe)) {
            const doc = iframe.contentDocument
            const that = this
            that.isAddImg = false
            that.curImg = doc.querySelector(`img#${id}`)
        }
    }
    clearImg() {
        this.isAddImg = true
        this.embedImg = new DTOEmbedImg()
    }
    //embed video
    loadVideoForm() {
        this.videoURLform = new UntypedFormGroup({
            'URL': new UntypedFormControl(this.embedVideo.URL, [Validators.required, Validators.minLength(10)]),
            'Width': new UntypedFormControl(this.embedVideo.Width, Validators.min(100)),
            'Height': new UntypedFormControl(this.embedVideo.Height, Validators.min(50)),
        })
    }
    closeVideoURLdialog() {
        this.isVideoURLdialog = false
        this.isAddVideo = true
        this.clearVideoForm()
    }

    embedVideoURL() {
        this.videoURLform.markAllAsTouched()

        if (this.videoURLform.valid) {
            const that = this
            // const index = this.myVidNumber
            var time = new Date().valueOf()
            const id = 'vid_' + time
            const val: DTOEmbedVideo = this.videoURLform.value
            const width = val.Width
            const height = val.Height

            this.embedVideo = val
            this.embedVideo.Code = id
            // this.embedVideo.ID = index
            // this.insertVideo(this.embedVideo.URL, width, height)

            if (this.isAddVideo) {
                const link = `</p><iframe id="${id}" width="${width > 0 ? width + 'px' : 'auto'}" height="${height > 0 ? height + 'px' : 'auto'}" 
                    src="${this.embedVideo.URL.replace('youtu.be', 'youtube.com/embed').replace('/watch?v=', '/embed/')}" 
                    class="yt_embed_vid" title="YouTube video player 1" frameborder="0" allowfullscreen #anchoriframe
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe><p>`

                this.myeditor.focus();
                this.myeditor.exec('insertText', { text: '#CURSOR#' });
                const newVal = this.myeditor.value.replace(/#CURSOR#/, link);
                // const newVal2 = newVal.replace(/#CURSOR#/, link);                  
                this.myeditor.exec('setHTML', this.myeditor.value.replace('#CURSOR#', link));
                this.myeditor.exec('insertText', link);
                // this.myVidNumber++;
                //todo index sẽ bị undefined sau khi add video mới, xóa video cũ
                // this.addVideoHoverListener(id, index, val)
                this.addVideoHoverListener(val)
                this.closeVideoURLdialog();
            }
            else {
                this.curVid.src = val.URL.replace('/watch?v=', '/embed/')
                this.curVid.style.height = val.Height
                this.curVid.style.width = val.Width
                const newVal = this.myeditor.value
                this.myeditor.value = newVal
                this.closeVideoURLdialog();
            }
        }
    }

    // addVideoHoverListener(id, index, val: DTOEmbedVideo) {
    addVideoHoverListener(val: DTOEmbedVideo) {
        const that = this;
        const iframe = (document.querySelector('.k-editor-content .k-iframe') as HTMLIFrameElement)
            .contentDocument.querySelector(`iframe#${val.Code}`)

        if (Ps_UtilObjectService.hasValue(iframe)) {
            iframe.addEventListener('mouseover', function mouseEnterVideo() {

                that.togglePopup(val.Code, val)
            });
            iframe.addEventListener('mouseleave', function mouseLeaveVideo() {

                // that.togglePopup(index, val)
                setTimeout(() => { that.that.popupShow = false }, 1000)
            });
        }
    }
    clearVideoForm() {
        this.isAddVideo = true
        this.videoURLform.reset()
        this.embedVideo = new DTOEmbedVideo()
    }
    onEmbedVideoURL() {
        this.loadVideoForm()
        this.isVideoURLdialog = true
        this.myeditor.focus();
    }
    editIframe() {
        this.embedVideo.ID
        this.embedVideo.URL = this.curVid.src
        this.embedVideo.Height = this.curVid.getBoundingClientRect().height
        this.embedVideo.Width = this.curVid.getBoundingClientRect().width
        this.isAddVideo = false

        this.loadVideoForm()
        this.isVideoURLdialog = true
    }
    togglePopup(index: string, item) {
        // if (index != this.currentAnchorIndex) {
        //   this.popupShow = true
        // } else if (index == this.currentAnchorIndex) {
        //   this.popupShow = !this.popupShow
        // }
        const that = this
        that.that.popupShow = true
        // this.currentAnchorIndex = index

        // if (this.popupShow && this.currentAnchorIndex > -1) {
        if (this.popupShow && Ps_UtilObjectService.hasValueString(index)) {
            this.getAnchor(index)
            // this.calculatePopupPosition(item)
        }
    }

    getAnchor(index) {
        let iframe = (document.querySelector('.k-editor-content .k-iframe') as HTMLIFrameElement);

        if (Ps_UtilObjectService.hasValue(iframe)) {
            let doc = iframe.contentDocument
            let that = this
            // this.curVid = doc.querySelector(`iframe#vid_${this.currentAnchorIndex}`)
            this.curVid = doc.querySelector(`iframe#${index}`)
            //addevent bị dup
            doc.addEventListener('click', function clickout($event) {
                if (//Ps_UtilObjectService.hasValue(that.curVid) &&
                    //!that.curVid.contains($event.target) &&
                    that.popupShow == true) {
                    that.closePopupCallback()
                }
            })
        }
        else {
            this.curVid = null
        }
        return this.curVid
    }
    that = this
    closePopupCallback() {
        const that = this
        that.that.popupShow = false
    }

    // calculatePopupPosition(item: { videoWidth: number, videoHeight: number, videoURL: string }) {
    //   let iframe = (document.querySelector('.k-editor-content .k-iframe') as HTMLIFrameElement);

    //   if (Ps_UtilObjectService.hasValue(iframe)) {
    //     const rect = iframe.getBoundingClientRect()
    //     $('.iframePopup').css({
    //       top: rect.top + rect.height / 2 + 'px',
    //       left: rect.left + rect.width / 2 + 'px'
    //     })
    //   }
    // }

    // checkIframeLoaded(myClass) {
    //     // let that = this
    //     const iframe = (document.querySelector('.k-editor-content .k-iframe') as HTMLIFrameElement)
    //     const iframeDoc = Ps_UtilObjectService.hasValue(iframe) ? iframe.contentDocument || iframe.contentWindow.document : null;
    //     // Check if loading is complete
    //     if (Ps_UtilObjectService.hasValue(iframeDoc) && iframeDoc.readyState == 'complete') {
    //         const ifr = iframe.contentDocument.querySelectorAll(`.yt_embed_vid`)

    //         if (Ps_UtilObjectService.hasListValue(ifr)) {
    //             for (var i = 0; i < ifr.length; i++) {
    //                 const ele = ifr[i]

    //                 var id = ele.id
    //                 var h = ele.clientHeight
    //                 var w = ele.clientWidth
    //                 var src = ele.getAttribute('src')
    //                 var index = id.replace('vid_', '');

    //                 var item = new DTOEmbedVideo()
    //                 item.ID = parseInt(index)
    //                 item.Height = h
    //                 item.Width = w
    //                 item.URL = src

    //                 if (myClass.myVidNumber < item.ID)
    //                     this.myVidNumber = item.ID + 1

    //                 myClass.addVideoHoverListener(id, index, item)
    //             }

    //             return true;
    //         } else
    //             return false
    //     } else
    //         return false
    // }
    getHtmlSelection(editor: EditorComponent) {
        const { state } = editor.view;
        const selection = state.selection;
        // Create a DOMSerializer to serialize the selected content to HTML
        const serializer = DOMSerializer.fromSchema(state.schema);
        let htmlContent = '';
        selection.content().content.forEach(node => {
            const domNode = serializer.serializeNode(node);
            // Check if it's an element node or text node
            if (domNode.nodeType === Node.ELEMENT_NODE) {
                htmlContent += (domNode as Element).outerHTML;  // For element nodes
            } else if (domNode.nodeType === Node.TEXT_NODE) {
                htmlContent += domNode.textContent;  // For text nodes
            }
        });
        return htmlContent
    }
    //#region Bookmark Heading Tag
    onInsertBookmark() {
        var oldValue = this.myeditor.value
        this.content = this.replaceHeadingTagId(oldValue)
        this.myeditor.exec('setHTML', this.content);
        this.myeditor.focus();
    }
    replaceHeadingTagId(selectedHtml: string) {
        const parser = new DOMParser();
        // Parse the selected HTML string into a document
        const doc = parser.parseFromString(selectedHtml, 'text/html');
        // Initialize a set to track existing IDs only from heading tags
        const existingIds = new Set<string>();
        // Collect IDs from heading tags (h2, h3, h4, h5, h6) only
        doc.querySelectorAll('h2[id], h3[id], h4[id], h5[id], h6[id]').forEach(el => {
            existingIds.add(el.id);  // Add existing ids from heading tags to the set
        });
        // Initialize a counter to create unique IDs
        let counter = 1;
        let prefix = `${this.layoutService.blogCode}`;
        // Loop through heading tags (h2, h3, h4, h5, h6)
        ['h2', 'h3', 'h4', 'h5', 'h6'].forEach(tag => {
            const elements = doc.getElementsByTagName(tag);
            for (let i = 0; i < elements.length; i++) {
                const element = elements[i];
                // Check if the element already has an ID
                if (!element.hasAttribute('id')) {
                    // Generate a unique ID, avoid conflicts with existing IDs
                    let newId = `${prefix}-${tag}-${counter}`;
                    while (existingIds.has(newId)) {
                        counter++;  // Increment the counter if ID is already taken
                        newId = `${prefix}-${tag}-${counter}`;
                    }
                    element.setAttribute('id', newId);  // Assign unique ID
                    existingIds.add(newId);  // Add the new ID to the set of existing IDs
                    counter++;
                }
            }
        });
        // Serialize the modified document back to a string
        const modifiedHtml = doc.body.innerHTML;
        return modifiedHtml
    }
    // Function to convert HTML into ProseMirror nodes using ProseMirror's DOMParser
    htmlToProseMirrorNodes(htmlElement: HTMLElement, schema: Schema) {
        const fragment = ProseMirrorDOMParser.fromSchema(schema).parse(htmlElement).content;
        return fragment;
    }
    // Function to remove empty heading tags in the editor
    removeEmptyHeadingsInEditor(): void {
        const editorBody = this.editorRef.view.dom as HTMLElement;
        const emptyHeadings = editorBody.querySelectorAll('h2:empty, h3:empty, h4:empty, h5:empty, h6:empty');
        // Remove all empty headings
        emptyHeadings.forEach(heading => heading.remove());
    }
    //#endregion Bookmark Heading Tag
    onInsertProductTag() {
        this.layoutService.setCartSearchProductDialog(true)
    }
    addProduct(Product: DTOProduct) {
        if (Product.Code != 0 || Product.Product != 0 || Product.ProductID != 0) {
            var link =
                // `<div type="product" data-code="${Product.ProductID}">
                `<img type="product" data-code="${Product.ProductID}" src="${Product.ImageThumb}" height="90" width="auto"/>`
            // </div>`
            this.myeditor.focus();
            this.myeditor.exec('insertText', { text: '#CURSOR#' });
            this.myeditor.exec('setHTML', this.myeditor.value.replace('#CURSOR#', link));
        }
        this.layoutService.setCartSearchProductDialog(false)
    }
}
