export class Article {
    id: number;
    content: string;
    createdate: Date;
    titre: string;
    username: string;
    subjectname: string;

    constructor(id: number, content: string, createdate: string, titre: string, username: string, subjectname: string) {
        this.id = id;
        this.content = content;
        this.createdate = new Date(createdate); // Convertir la date en objet Date
        this.titre = titre;
        this.username = username;
        this.subjectname = subjectname;
    }
}
