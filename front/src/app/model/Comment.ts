export class Comment{

    comment: string;
    username: string;
    createdate : Date;

    constructor(comment: string, username: string, createdate: Date){
        this.comment = comment;
        this.username = username;
        this.createdate = createdate;
    }
}