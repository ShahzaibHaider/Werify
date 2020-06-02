import { Message } from './message';

export class Chat {
      constructor(
            public _id: string,
            public organization: string,
            public recipient: string,
            public rec_img_path: string,
            public org_img_path: string,
            public messages: Message[],
            public rec_archieved_status: boolean,
            public org_archieved_status: boolean,
            public rec_pinned_status: boolean,
            public org_pinned_status: boolean,
            public rec_delete_status: boolean,
            public org_delete_status: boolean,
      ) { }
}
