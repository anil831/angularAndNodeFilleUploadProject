import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Angular 5';


  singleImage: any;
  multipleImages: any = [];
  constructor(private http: HttpClient) {

  }

  @ViewChild('fileupload2', { static: false })
  fileupload!: ElementRef;
  @ViewChild('multipleInput', { static: false }) multipleInput!: ElementRef;
  onFileUpload(event: any) {

    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      this.http.post('http://localhost:3000/', formData).subscribe(response => {

      })
    }

  }
  onFileUpload2() {

    if (this.fileupload.nativeElement.files.length > 0) {
      const file: File = this.fileupload.nativeElement.files[0];

      const formData: FormData = new FormData();
      formData.set('file', file);
      this.http.post('http://localhost:3000/', formData).subscribe((response: any) => {

        this.singleImage = response.path;
        this.fileupload.nativeElement.value = ""


      })
    }
  }

  onMultipleImagesUpload(event: any) {

    if (event.target.files.length > 0) {
      this.multipleImages = event.target.files;
      const formData: FormData = new FormData();
      for (let img of this.multipleImages) {
        const file: File = img;
        formData.append('files', file);

      }
      this.http.post('http://localhost:3000/multipleFiles', formData).subscribe((response: any) => {
        this.multipleInput.nativeElement.value = ""
        console.log(response);

        this.multipleImages = response.path;


      })
    }
  }
}
