export class Job {
      constructor(
            public _id: string,
            public title: string,
            public designation: string,
            public salary: string,
            public vacancies: string,
            public description: string,
            public field: string,
            public date: string,
            public retract_job: boolean,
            public location: string,
            public job_type,
            public user: string) { }
}
