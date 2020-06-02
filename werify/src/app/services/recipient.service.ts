import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Recipient } from '../models/recipient';
import { Organization } from '../models/organization';
import { Feedback } from '../models/feedback';
import { Application } from '../models/application';
import { HireRequest } from '../models/hire-request';


@Injectable({
  providedIn: 'root'
})
export class RecipientService {

  url = "http://localhost:3000/recipient/";

  constructor(private http: HttpClient) { }

  signup(recipient: Recipient) {
    return this.http.post<JSON>(this.url.concat("signup"), recipient);
  }
  signin(recipient: Recipient) {
    return this.http.post<JSON>(this.url.concat("signin"), recipient);
  }
  recipientDetails(username: string) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Rtoken"));
    let params = new HttpParams().set("username", username);
    return this.http.get(this.url.concat("view"), { params: params, headers: headers_object })
  }
  recipientDetailsForOrganization(username: string) {
    return this.http.post(this.url.concat("view"), { "username": username });
  }
  updateRecipient(data: FormData) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Rtoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Rusername"));
    return this.http.post(this.url.concat("update"), data, { params: params, headers: headers_object });
  }
  viewEmployers() {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Rtoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Rusername"));
    return this.http.get<Organization[]>(this.url.concat("viewEmployers"), { params: params, headers: headers_object });
  }
  getRecipientCertificates() {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Rtoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Rusername"));
    return this.http.get(this.url.concat("getRecipientCertificates"), { params: params, headers: headers_object });
  }
  getRecipientCertificatesForOrganization(username: string) {
    return this.http.post(this.url.concat("getRecipientCertificates"), { "username": username });
  }
  getCertificate(certificate_no: string) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Rtoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Rusername"));
    return this.http.post(this.url.concat("get_certificate"), { "certificate_number": certificate_no }, { params: params, headers: headers_object });
  }
  changePassword(old_password: string, new_password: string) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Rtoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Rusername"));
    return this.http.post(this.url.concat("change_password"), { "old_password": old_password, "new_password": new_password }, { params: params, headers: headers_object })
  }
  feedback(feedback: Feedback) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Rtoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Rusername"));
    return this.http.post(this.url.concat("feedback"), feedback, { params: params, headers: headers_object })
  }
  GetJobs() {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Rtoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Rusername"));
    return this.http.get(this.url.concat("jobs"), { params: params, headers: headers_object })
  }
  GetJob(id: string) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Rtoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Rusername"));
    return this.http.post(this.url.concat("get_job"), { "job_id": id }, { params: params, headers: headers_object })
  }
  GetOrganizationDetail(username: string) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Rtoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Rusername"));
    return this.http.post(this.url.concat("get_org"), { "username": username }, { params: params, headers: headers_object })
  }
  ApplicationOnJob(application: Application) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Rtoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Rusername"));
    return this.http.post(this.url.concat("application_on_job"), application, { params: params, headers: headers_object })
  }
  ApplicationsByRecipient() {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Rtoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Rusername"));
    return this.http.get(this.url.concat("applications_by_recipient"), { params: params, headers: headers_object })
  }
  DeleteApplication(job_id: string, username: string) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Rtoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Rusername"));
    return this.http.post(this.url.concat("delete_application"), { "job_id": job_id, "username": username }, { params: params, headers: headers_object })
  }

  sendHireRequest(hireRequest: HireRequest) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Rtoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Rusername"));
    return this.http.post(this.url.concat("sendHireRequest"), { "hireRequest": hireRequest }, { params: params, headers: headers_object })
  }
  getHireRequests() {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Rtoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Rusername"));
    return this.http.get(this.url.concat("getHireRequests"), { params: params, headers: headers_object })
  }
  getChats() {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Rtoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Rusername"));
    return this.http.get(this.url.concat("getChats"), { params: params, headers: headers_object })
  }
  AcceptOffer(id: string, org: string) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Rtoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Rusername"));
    return this.http.post(this.url.concat("acceptOffer"), { "id": id, "org": org }, { params: params, headers: headers_object })
  }
  RejectOffer(id: string) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Rtoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Rusername"));
    return this.http.post(this.url.concat("rejectOffer"), { "id": id }, { params: params, headers: headers_object })
  }
  getChat(id: string) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Rtoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Rusername"));
    return this.http.post(this.url.concat("getChat"), { "id": id }, { params: params, headers: headers_object })
  }




  VerifyEmail(email: string) {
    return this.http.post("http://localhost:3000/email/verify_email", { "email": email });
  }
}
