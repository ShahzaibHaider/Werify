import { Course } from './course';

export class Organization {
      constructor(
            public first_name: string,
            public last_name: string,
            public username: string,
            public email: string,
            public password: String,
            public joining_date: Date,
            public forgot_password_key: string,
            public email_status: Boolean,
            public phone: String,
            public phone_status: boolean,
            public country: string,
            public province: string,
            public city: string,
            public json_Canva: string,
            public district: string,
            public address: string,
            public img_path: string,
            public approved: boolean,
            public blocked: boolean,
            public profile_completed_status: boolean,
            public proof_document_path: boolean,
            public creation_date: Date,
            public courses: Course[]) { }
}

