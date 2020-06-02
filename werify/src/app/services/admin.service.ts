import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Admin } from '../models/admin';
import { Feedback } from '../models/feedback';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  url = "http://localhost:3000/admin/";
  constructor(private http: HttpClient) { }

  signin(admin: Admin) {
    return this.http.post<JSON>(this.url.concat("signin"), admin);
  }

  ForgotPassword(email: string, user_type: string) {
    return this.http.post("http://localhost:3000/email/forgot_password", { "email": email, "user_type": user_type });
  }
  SetNewPassword(username: string, user_type: string, time_value: string, new_password: string) {
    return this.http.post("http://localhost:3000/admin/set_new_password", { "username": username, "user_type": user_type, "time_value": time_value, "new_password": new_password });
  }
  GetCertificates() {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Atoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Ausername"));
    return this.http.get(this.url.concat("get_certificates"), { params: params, headers: headers_object })
  }

  GetFeedbacks() {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Atoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Ausername"));
    return this.http.get(this.url.concat("get_feedbacks"), { params: params, headers: headers_object })
  }
  GetRecipients() {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Atoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Ausername"));
    return this.http.get(this.url.concat("get_recipients"), { params: params, headers: headers_object })
  }
  GetOrganizations() {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Atoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Ausername"));
    return this.http.get(this.url.concat("get_organizations"), { params: params, headers: headers_object })
  }
  GetRequests() {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Atoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Ausername"));
    return this.http.get(this.url.concat("get_requests"), { params: params, headers: headers_object })
  }
  GetStats() {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Atoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Ausername"));
    return this.http.get(this.url.concat("get_stats"), { params: params, headers: headers_object })
  }
  Approve(username: string) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Atoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Ausername"));
    return this.http.post(this.url.concat("approve_request"), { "username": username }, { params: params, headers: headers_object })
  }
  Reply(feedback: Feedback) {
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("Atoken"));
    let params = new HttpParams().set("username", localStorage.getItem("Ausername"));
    return this.http.post("http://localhost:3000/email/reply", { "feedback": feedback }, { params: params, headers: headers_object })
  }




  VerifyEmail(email: string) {
    return this.http.post("http://localhost:3000/email/verify_email", { "email": email });
  }

}
