import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Organization } from '../models/organization';
import { Certificate } from '../models/certificate';
import { Course } from '../models/course';
import { Feedback } from '../models/feedback';
import { Job } from '../models/job';
import { Chat } from '../models/chat';
import { HireRequest } from '../models/hire-request';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  url = "http://localhost:3000/organization/";

  constructor(private http: HttpClient) { }

  signup(organization: Organization) {
    return this.http.post<JSON>(this.url.concat("signup"), organization);
  }
  signin(organization: Organization) {
    return this.http.post<JSON>(this.url.concat("signin"), organization);
  }
  updateOrganization(data: FormData) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Otoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Ousername"));
    return this.http.post(this.url.concat("update"), data, { params: params, headers: headers_object });
  }
  orgDetails() {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Otoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Ousername"));
    return this.http.get(this.url.concat("view"), { params: params, headers: headers_object })
  }
  orgDetailsForRecipient(username: string) {

    return this.http.post(this.url.concat("view"), { "username": username });
  }
  AddCourse(data: FormData) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Otoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Ousername"));
    return this.http.post(this.url.concat("add_course"), data, { params: params, headers: headers_object })
  }
  saveDesign(organization: Organization) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Otoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Ousername"));
    return this.http.post<JSON>(this.url.concat("save_design"), organization, { params: params, headers: headers_object })
  }
  issueCertificate(certificate: Certificate) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Otoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Ousername"));
    return this.http.post<JSON>(this.url.concat("issue_certificate"), certificate, { params: params, headers: headers_object })
  }
  awardedCertificates() {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Otoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Ousername"));
    return this.http.get<Certificate[]>(this.url.concat("awarded_certificates"), { params: params, headers: headers_object })
  }
  updateCourses(courses: Course[]) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Otoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Ousername"));
    return this.http.post(this.url.concat("update_courses"), courses, { params: params, headers: headers_object })
  }
  deleteCourse(course_name: string) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Otoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Ousername"));
    return this.http.post(this.url.concat("delete_course"), { "course_name": course_name }, { params: params, headers: headers_object })
  }
  getRecipients() {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Otoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Ousername"));
    return this.http.get(this.url.concat("getRecipients"), { params: params, headers: headers_object })
  }
  changePassword(old_password: string, new_password: string) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Otoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Ousername"));
    return this.http.post(this.url.concat("change_password"), { "old_password": old_password, "new_password": new_password }, { params: params, headers: headers_object })
  }
  feedback(feedback: Feedback) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Otoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Ousername"));
    return this.http.post(this.url.concat("feedback"), feedback, { params: params, headers: headers_object })
  }
  PostJob(job: Job) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Otoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Ousername"));
    return this.http.post(this.url.concat("post_job"), job, { params: params, headers: headers_object })
  }
  GetJobForOrganization() {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Otoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Ousername"));
    return this.http.get(this.url.concat("get_organization_jobs"), { params: params, headers: headers_object })
  }
  GetJobForOrganizationForRecipient(username: string) {
    return this.http.post(this.url.concat("get_organization_jobs"), { "username": username })
  }
  GetJob(job_id: string) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Otoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Ousername"));
    return this.http.post(this.url.concat("get_job"), { "job_id": job_id }, { params: params, headers: headers_object })
  }
  UpdateJob(job: Job) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Otoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Ousername"));
    return this.http.post(this.url.concat("update_job"), job, { params: params, headers: headers_object })
  }
  RetractJob(job_id: string) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Otoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Ousername"));
    return this.http.post(this.url.concat("retract_job"), { "job_id": job_id }, { params: params, headers: headers_object })
  }
  UnRetractJob(job_id: string) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Otoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Ousername"));
    return this.http.post(this.url.concat("unretract_job"), { "job_id": job_id }, { params: params, headers: headers_object })
  }
  ApplicationByJob(job_id: string) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Otoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Ousername"));
    return this.http.post(this.url.concat("applications_on_job"), { "job_id": job_id }, { params: params, headers: headers_object })
  }
  RejectApplication(job_id: string, username: string) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Otoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Ousername"));
    return this.http.post(this.url.concat("reject_application"), { "job_id": job_id, "username": username }, { params: params, headers: headers_object })
  }
  GetCertificateCounter(username: string, cnic: string) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Otoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Ousername"));
    return this.http.post(this.url.concat("get_certificate_counter"), { "username": username, "cnic": cnic }, { params: params, headers: headers_object })
  }
  CreateChat(chat: Chat) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Otoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Ousername"));
    return this.http.post(this.url.concat("createChat"), { "chat": chat }, { params: params, headers: headers_object })
  }
  getChats() {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Otoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Ousername"));
    return this.http.get(this.url.concat("getChats"), { params: params, headers: headers_object })
  }
  sendHireRequest(hireRequest: HireRequest) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Otoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Ousername"));
    return this.http.post(this.url.concat("sendHireRequest"), { "hireRequest": hireRequest }, { params: params, headers: headers_object })
  }
  getHireRequests() {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Otoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Ousername"));
    return this.http.get(this.url.concat("getHireRequests"), { params: params, headers: headers_object })
  }
  getEmployees() {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Otoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Ousername"));
    return this.http.get(this.url.concat("getEmployees"), { params: params, headers: headers_object })
  }
  getChat(id: string) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Otoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Ousername"));
    return this.http.post(this.url.concat("getChat"), { "id": id }, { params: params, headers: headers_object })
  }





  VerifyEmail(email: string) {
    return this.http.post("http://localhost:3000/email/verify_email", { "email": email });
  }
}
