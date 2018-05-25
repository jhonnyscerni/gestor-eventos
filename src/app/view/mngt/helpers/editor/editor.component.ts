import {Component, OnDestroy, AfterViewInit, EventEmitter, Input, Output, OnInit, OnChanges} from '@angular/core';
import {isNullOrUndefined} from "util";
import { Inscricao } from '../../../../domain/inscricao';


@Component({
  selector: 'text-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {


  @Input() elementId: string;
  @Input() value: string;
  @Output() onEditorKeyup: EventEmitter<any> = new EventEmitter<any>();

  baseURL: string = '/';

  constructor() {
  }


  ngOnInit() {


  }


  editor;

  ngAfterViewInit() {
    tinymce.init({
      selector: '#' + this.elementId,
      height: 600,
      plugins: ['link', 'paste', 'table', 'code', 'textpattern'],
      toolbar1: " bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | styleselect formatselect fontselect fontsizeselect",
      skin_url: this.baseURL + 'assets/skins/lightgray',
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          const content = editor.getContent();
          this.onEditorKeyup.emit(content);
        });
      },
    });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }


  didSetValue: boolean = false;


  ngOnChanges(){

    //console.log(this.value);

    if (!isNullOrUndefined(this.editor) && this.value !== "" && !this.didSetValue) {

      console.log(this.value);
      this.didSetValue = true;
      this.editor.setContent(this.value);


    }
  }

}
