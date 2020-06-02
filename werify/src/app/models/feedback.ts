export class Feedback {
      constructor(
            public feedback_id: string,
            public provider: string,
            public category: string,
            public desc: string,
            public user_type: string,
            public date: string,
            public replied: boolean) { }
}
