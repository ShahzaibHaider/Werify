export class Message {
      constructor(
            public _id: string,
            public user: string,
            public message_text: string,
            public file_path: string,
            public type: string,
            public date: Date
      ) { }
}
