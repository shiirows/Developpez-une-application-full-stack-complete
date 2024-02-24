export class ArticleRequest {
  idSubject: number;
  content: string;
  titre: string;

  constructor(id: number, content: string, titre: string) {
    this.idSubject = id;
    this.content = content;
    this.titre = titre;
  }
}
