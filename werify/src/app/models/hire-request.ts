export class HireRequest {
      constructor(
            public _id: string,
            public from: string,
            public to: string,
            public date: string,
            public salary: string,
            public status: boolean,
            public job_title: string
      ) { }
}
