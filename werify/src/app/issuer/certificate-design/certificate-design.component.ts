import { Component, OnInit } from '@angular/core';
import 'fabric';
import Swal from 'sweetalert2';
import { OrganizationService } from 'src/app/services/organization.service';
import { Organization } from 'src/app/models/organization';
declare let fabric;
@Component({
  selector: 'app-certificate-design',
  templateUrl: './certificate-design.component.html',
  styleUrls: ['./certificate-design.component.css']
})
export class CertificateDesignComponent implements OnInit {

  files: File;
  imageSrc;
  public canvas;
  public text;
  public font_name = 'arial';
  public font_size = '50';
  public bold_selected = false;
  public italic_selected = false;
  public underline_selected = false;
  file: File;

  private org: Organization;
  constructor(private orgService: OrganizationService) { }

  ngOnInit() {
    this.canvas = new fabric.Canvas('canvas');
    this.orgService.orgDetails().subscribe(
      data => {
        this.org = data[0];
        if (this.org.json_Canva) {
          this.org.json_Canva = JSON.parse(this.org.json_Canva)
          this.canvas.loadFromJSON(this.org.json_Canva, this.canvas.renderAll.bind(this.canvas), function (o, object) {
            // fabric.log(o, object);
          })
        } else {
          var text = new fabric.Text("Organization Name", {
            left: 190,
            top: 100,
            fontFamily: 'Arial',
            fill: '#333',
            fontSize: 50,
            id: "org"
          });
          this.canvas.add(text);
          var text = new fabric.Text("Course name", {
            left: 325,
            top: 230,
            fontFamily: 'Arial',
            fill: '#333',
            fontSize: 25,
            id: "cou"
          });
          this.canvas.add(text);
          var text = new fabric.Text("Recipient Name", {
            left: 300,
            top: 170,
            fontFamily: 'Arial',
            fill: '#333',
            fontSize: 30,
            id: "rec"
          });
          this.canvas.add(text);
          var text = new fabric.Text("Date Issued", {
            left: 350,
            top: 300,
            fontFamily: 'Arial',
            fill: '#333',
            fontSize: 15,
            id: "dat"
          });
          this.canvas.add(text);
          // var imgURL = "https://cdn1.iconfinder.com/data/icons/hawcons/32/699902-icon-34-award-512.png";
          // const pubImg = new Image();
          // var pug = new fabric.Image(pubImg, {
          //   width: 550,
          //   height: 550,
          //   left: 600,
          //   top: 250,
          //   scaleX: .25,
          //   scaleY: .25
          // });
          // this.canvas.add(pug);
          // pubImg.src = imgURL;
        }
      },
      err => { console.log(err) }
    )
  }









  align(to: string) {
    var activeObj = this.canvas.getActiveObject() || this.canvas.getActiveGroup();
    if (to != '' && activeObj) {
      this.process_align(to, activeObj);
      activeObj.setCoords();
      this.canvas.renderAll();
    }
  }












  process_align(val, activeObj) {
    switch (val) {
      case 'left':
        activeObj.set({
          left: 0
        });
        break;
      case 'right':
        activeObj.set({
          left: this.canvas.width - (activeObj.width * activeObj.scaleX)
        });
        break;
      case 'top':
        activeObj.set({
          top: 0
        });
        break;
      case 'bottom':
        activeObj.set({
          top: this.canvas.height - (activeObj.height * activeObj.scaleY)
        });
        break;
      case 'center':
        activeObj.set({
          left: (this.canvas.width / 2) - ((activeObj.width * activeObj.scaleX) / 2)
        });
        break;
    }
  }










  add_text() {
    if (this.font_name) {
      var text = new fabric.IText("New Text", {
        left: 50,
        top: 100,
        fontFamily: this.font_name,
        fill: (<HTMLInputElement>document.getElementById("color_value")).value,
        fontSize: this.font_size
      });
      if (this.bold_selected) {
        text["fontWeight"] = "bold";
      }
      if (this.italic_selected) {
        text["fontStyle"] = "italic";
      }
      if (this.underline_selected) {
        text["underline"] = "true";
      }
      this.canvas.add(text);
    } else {
      Swal.fire('Error', 'No Font Selected', 'error');
    }
  }








  onFileSelected($event) {
    this.file = $event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => {
      this.imageSrc = reader.result;
      this.add_picture(this.imageSrc);
    };
    reader.readAsDataURL(this.file);
  }









  add_picture(imgURL: string) {
    const pubImg = new Image();
    var pug = new fabric.Image(pubImg, {
      width: 500,
      height: 700,
      left: 50,
      top: 70,
      scaleX: .25,
      scaleY: .25
    });
    this.canvas.add(pug);
    pubImg.src = imgURL;
  }









  changestyle(type: string) {
    if (type == "bold") {
      if (this.bold_selected == false) {
        this.bold_selected = true;
      } else {
        this.bold_selected = false;
      }
    } else if (type == "italic") {
      if (this.italic_selected == false) {
        this.italic_selected = true;
      } else {
        this.italic_selected = false;
      }
    } else {
      if (this.underline_selected == false) {
        this.underline_selected = true;
      } else {
        this.underline_selected = false;
      }
    }
  }







  add_shape() {
    Swal.fire({
      title: 'Choose Shape',
      input: 'select',
      inputOptions: {
        triangle: 'Triangle',
        square: 'Square',
        circle: 'Circle',
      },
      inputPlaceholder: 'Select Shape',
      showCancelButton: true
    }).then((result) => {
      if (result['value'] == 'triangle') {
        var triangle = new fabric.Triangle({
          top: 100,
          left: 100,
          width: 100,
          height: 100,
          fill: (<HTMLInputElement>document.getElementById("color_value")).value
        });
        this.canvas.add(triangle);
      } else if (result['value'] == 'square') {
        const rect = new fabric.Rect({
          top: 100,
          left: 100,
          width: 100,
          height: 100,
          fill: (<HTMLInputElement>document.getElementById("color_value")).value
        });
        this.canvas.add(rect);
      } else if (result['value'] == 'circle') {
        var circle = new fabric.Circle({
          top: 100,
          left: 100,
          radius: 50,
          fill: (<HTMLInputElement>document.getElementById("color_value")).value
        });
        this.canvas.add(circle);
      }
    });
  }







  removeSelectedCanvasElement() {
    var element = this.canvas.getActiveObject() || this.canvas.getActiveGroup();
    if (element._objects) {
      console.log("Only Single Element Can be Selected");
    } else {
      if (element['id'] == 'cou' || element['id'] == 'dat' || element['id'] == 'org') {
      } else {
        this.canvas.remove(element);
      }
    }
  }






  undo() {
    var element = this.canvas._objects[this.canvas._objects.length - 1];
    if (element['id'] == 'cou' || element['id'] == 'dat' || element['id'] == 'org') {
      console.log('Nothing to undo');
    } else {
      this.canvas.remove(element);
    }
  }






  save() {
    this.org.json_Canva = this.canvas.toJSON(['id']);
    this.orgService.saveDesign(this.org).subscribe(
      data => {
        if (data["message"] == "success") {
          Swal.fire("Successful", "Design Updated Successfully", "success")
        } else {
          Swal.fire("Error", "Some Error Occured", "error");
        }
      },
      err => { console.log(err) }
    );
  }



  changebackground() {
    var color = (<HTMLInputElement>document.getElementById("color_value")).value;
    this.canvas.backgroundColor = color;
    this.canvas.renderAll();
  }
}

