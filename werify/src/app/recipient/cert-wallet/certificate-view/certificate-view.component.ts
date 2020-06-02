import { Component, OnInit } from '@angular/core';
import { RecipientService } from 'src/app/services/recipient.service';
import { Certificate } from 'src/app/models/certificate';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import 'fabric';
import Swal from 'sweetalert2';
declare let fabric;

import Web3 from 'web3';
const wa = window as any;

@Component({
  selector: 'app-certificate-view',
  templateUrl: './certificate-view.component.html',
  styleUrls: ['./certificate-view.component.css']
})
export class CertificateViewComponent implements OnInit {

  private contract;
  private web3;
  private account: string;


  public canvas;
  private certificate: Certificate;
  constructor(private recService: RecipientService, private route: ActivatedRoute) { }

  ngOnInit() {
    if (window.hasOwnProperty('web3')) {
      let ethereum = wa.ethereum;
      ethereum.enable();
      this.web3 = new Web3();
      this.web3.setProvider(wa.web3.currentProvider);
      var address = "0xc62670cf003F6b8a57631dF5dF06dABEa79e8C7e";
      this.contract = new this.web3.eth.Contract([
        {
          "constant": false,
          "inputs": [
            {
              "name": "cert_id",
              "type": "string"
            },
            {
              "name": "sender",
              "type": "string"
            },
            {
              "name": "reciever",
              "type": "string"
            },
            {
              "name": "date",
              "type": "string"
            }
          ],
          "name": "IssueCertificate",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "CertificateCounter",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "certs",
          "outputs": [
            {
              "name": "id",
              "type": "uint256"
            },
            {
              "name": "cert_id",
              "type": "string"
            },
            {
              "name": "sender",
              "type": "string"
            },
            {
              "name": "reciever",
              "type": "string"
            },
            {
              "name": "date",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "index",
              "type": "uint256"
            }
          ],
          "name": "getCertificateDetail",
          "outputs": [
            {
              "name": "",
              "type": "uint256"
            },
            {
              "name": "",
              "type": "string"
            },
            {
              "name": "",
              "type": "string"
            },
            {
              "name": "",
              "type": "string"
            },
            {
              "name": "",
              "type": "string"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "index",
              "type": "uint256"
            },
            {
              "name": "cert_id",
              "type": "string"
            }
          ],
          "name": "werify",
          "outputs": [
            {
              "name": "",
              "type": "bool"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        }
      ], address);
      this.web3.eth.getAccounts().then((accounts) => {
        this.account = accounts[0];
        // console.log(accounts);
      });
    } else {
      Swal.fire("Error", "No Metamask Installed", "error");
    }

    this.canvas = new fabric.Canvas('canvas');
    this.recService.getCertificate(this.route.snapshot.paramMap.get('certificate_number')).subscribe(
      data => {
        this.certificate = data["docs"][0];
        this.certificate["design"] = JSON.parse(this.certificate["design"])
        this.canvas.loadFromJSON(this.certificate["design"], this.canvas.renderAll.bind(this.canvas), function (o, object) {
          object.set('selectable', false);
          if (object["id"] == "org" || object["id"] == "rec" || object["id"] == "cou" || object["id"] == "dat") {
            object.set({
              left: (800 / 2) - ((object.width * object.scaleX) / 2)
            });
          }
        })
      },
      err => { console.log(err) }
    )
  }
  DowloadAsImage() {
    var value;
    if (this.canvas.backgroundColor) {
      value = this.canvas.backgroundColor;
    } else {
      value = "white";
    }
    this.canvas.backgroundColor = value;
    this.canvas.renderAll()
    var dataURL = this.canvas.toDataURL('image/jpeg');
    let link = document.createElement("a");
    link.href = dataURL;
    link.setAttribute('visibility', 'hidden');
    link.download = 'Certificate';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  VerifyCertificate() {
    // console.log(this.account);
    // console.log(this.certificate.certificate_block_number);
    // var number = parseInt(this.certificate.certificate_block_number);
    this.contract.methods.werify(1, this.certificate.certificate_no).call().then((data) => {
      // console.log(data);
      if (data != true) {
        Swal.fire("Verified", "Verified Successfully", "success");
      } else {

      }
    });
  }
  DowloadAsPDF() {
    var value;
    if (this.canvas.backgroundColor) {
      value = this.canvas.backgroundColor;
    } else {
      value = "white";
    }
    this.canvas.backgroundColor = value;
    this.canvas.renderAll();
    var doc = new jsPDF("l", "mm", "a4");
    var width = doc.internal.pageSize.getWidth();
    var height = doc.internal.pageSize.getHeight();
    var imgData = this.canvas.toDataURL("image/jpeg", 1.0);
    doc.addImage(imgData, 'JPEG', 0, 0, width, height);
    doc.save("Certificate.pdf");
  }

}
