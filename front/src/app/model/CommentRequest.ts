export class CommentRequest {
    idArticle: number;
    content: string;
  
    constructor(id: number, content: string) {
      this.idArticle = id;
      this.content = content;
    }
  }
  