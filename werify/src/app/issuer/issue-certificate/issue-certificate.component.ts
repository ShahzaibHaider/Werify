import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Certificate } from 'src/app/models/certificate';
import { OrganizationService } from 'src/app/services/organization.service';
import { Organization } from 'src/app/models/organization';
import { Course } from 'src/app/models/course';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import Web3 from 'web3';
const wa = window as any;

@Component({
  selector: 'app-issue-certificate',
  templateUrl: './issue-certificate.component.html',
  styleUrls: ['./issue-certificate.component.css']
})
export class IssueCertificateComponent implements OnInit {

  private contract;
  private web3;
  private account: string;

  private org: Organization;
  private courses: Course[];
  private certificate = new Certificate(null, null, null, null, null, null, null, null);

  constructor(private orgService: OrganizationService, private router: Router) {
  }



  ngOnInit() {
    if (window.hasOwnProperty('web3')) {
      let ethereum = wa.ethereum;
      ethereum.enable();
      this.web3 = new Web3();
      this.web3.setProvider(wa.web3.currentProvider);
      var address = "0x5648cf51d75Eaaf7030C3Be3f25f10F2c011edCC";
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
    this.orgService.orgDetails().subscribe(
      data => {
        this.org = data[0];
        this.courses = this.org.courses;
        this.certificate.sender = this.org.username;
      },
      err => { console.log(err); })
  }



  onSubmit(formdata: NgForm) {
    this.certificate.issue_date = "" + new Date();
    var canva_json = JSON.parse(this.org.json_Canva);
    for (var i = 0; i < canva_json["objects"].length; i++) {
      if (canva_json["objects"][i]["id"] == "rec") {
        canva_json["objects"][i]["text"] = this.certificate.reciever;
      } else if (canva_json["objects"][i]["id"] == "org") {
        canva_json["objects"][i]["text"] = this.certificate.sender;
      } else if (canva_json["objects"][i]["id"] == "dat") {
        const now = new Date();
        const formatedDate = now.toLocaleString("en-GB", { day: "numeric", month: "long", year: "numeric" });
        canva_json["objects"][i]["text"] = formatedDate;
      } else if (canva_json["objects"][i]["id"] == "cou") {
        canva_json["objects"][i]["text"] = this.certificate.course;
      } else {
      }
    }
    canva_json = JSON.stringify(canva_json);
    this.certificate.design = canva_json;
    // console.log(this.certificate);
    this.orgService.GetCertificateCounter(this.certificate.reciever, this.certificate.reciever_cnic).subscribe(
      data => {
        if (data["message"] == "failure") {
          Swal.fire("Error", data["mes"], "error");
        } else {
          this.certificate.certificate_no = data["docs"];
          this.contract.methods.CertificateCounter().call().then((count) => {
            this.certificate.certificate_block_number = count;
            this.contract.methods.IssueCertificate("" + this.certificate.certificate_no, "" + this.certificate.sender, "" + this.certificate.reciever, "" + this.certificate.issue_date).send({ from: this.account }).then(function (result) {
              console.log(result);
              Swal.fire("Successfull", "Successfully Added Into Blockchain", "success");
            });
            // Swal.fire("Loading", "Uploading On Blockchain", "info");
            this.orgService.issueCertificate(this.certificate).subscribe(
              data => {
                console.log(data);
                if (data["message"] == "success") {
                  // Swal.fire("Successful", "Certificate Issued Successfully", "success");
                  this.certificate = data["certificate"];
                } else {
                  Swal.fire("Error", data["message"], "error");
                }
              },
              err => { console.log(err) }
            )
          });
        }
      },
      err => { console.log(err) }
    )








    // this.contract.methods.getCertificateDetail(23).call().then((data) => {
    //   console.log(data);
    // });


  }
}
